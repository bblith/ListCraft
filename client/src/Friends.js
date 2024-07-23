import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { auth, db } from './Firebase';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const friendsUnsub = onSnapshot(
        query(collection(db, 'friends'), where('userId', '==', user.uid)),
        (snapshot) => {
          const friendsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setFriends(friendsData);
        }
      );

      const requestsUnsub = onSnapshot(
        query(collection(db, 'friendRequests'), where('to', '==', user.email)),
        (snapshot) => {
          const requestsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setFriendRequests(requestsData);
        }
      );

      return () => {
        friendsUnsub();
        requestsUnsub();
      };
    }
  }, []);

  const handleAddFriend = async () => {
    const user = auth.currentUser;
    if (user && newFriendEmail) {
      try {
        await addDoc(collection(db, 'friendRequests'), {
          from: user.email,
          to: newFriendEmail,
          status: 'pending'
        });
        setNewFriendEmail('');
      } catch (err) {
        console.error('Error adding friend:', err);
      }
    }
  };

  const handleAcceptRequest = async (requestId, fromEmail) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Add friend for current user
        await addDoc(collection(db, 'friends'), {
          userId: user.uid,
          friendEmail: fromEmail
        });

        // Fetch the friend's user ID
        const friendSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', fromEmail)));
        if (friendSnapshot.empty) {
          throw new Error('Friend not found');
        }
        const friendId = friendSnapshot.docs[0].id;

        // Add friend for the other user
        await addDoc(collection(db, 'friends'), {
          userId: friendId,
          friendEmail: user.email
        });

        // Remove friend request
        await deleteDoc(doc(db, 'friendRequests', requestId));
      } catch (err) {
        console.error('Error accepting friend request:', err);
      }
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, 'friendRequests', requestId));
    } catch (err) {
      console.error('Error declining friend request:', err);
    }
  };

  const handleRemoveFriend = async (friendId, friendEmail) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Remove friend for current user
        await deleteDoc(doc(db, 'friends', friendId));

        // Fetch the friend's user ID
        const friendSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', friendEmail)));
        if (friendSnapshot.empty) {
          throw new Error('Friend not found');
        }
        const friendUserId = friendSnapshot.docs[0].id;

        // Remove friend for the other user
        const friendDocSnapshot = await getDocs(query(collection(db, 'friends'), where('userId', '==', friendUserId), where('friendEmail', '==', user.email)));
        if (!friendDocSnapshot.empty) {
          const friendDocId = friendDocSnapshot.docs[0].id;
          await deleteDoc(doc(db, 'friends', friendDocId));
        }
      } catch (err) {
        console.error('Error removing friend:', err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">Friends</h2>
      <div className="dashboard">
        <div className="friends-section">
          <div className="friends-section-header">
            <h2>Add Friend</h2>
          </div>
          <div className="dashboard-header">
            <input
              type="email"
              placeholder="Enter friend's email"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="input-field"
            />
            <button onClick={handleAddFriend} className="submitButton">Add</button>
          </div>
        </div>

        <div className="friends-section">
          <div className="friends-section-header">
            <h2>Friend Requests</h2>
          </div>
          <ul className="list">
            {friendRequests.map(request => (
              <li key={request.id} className="list-item">
                {request.from}
                <div>
                  <button onClick={() => handleAcceptRequest(request.id, request.from)} className="submitButton">Accept</button>
                  <button onClick={() => handleDeclineRequest(request.id)} className="submitButton">Decline</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="friends-section">
          <div className="friends-section-header">
            <h2>Friends List</h2>
          </div>
          <ul className="list">
            {friends.map((friend, index) => (
              <li key={index} className="list-item">
                {friend.friendEmail}
                <div>
                  <button onClick={() => handleRemoveFriend(friend.id, friend.friendEmail)} className="submitButton">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Friends;
