import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Card from './Card';
import { auth, db } from './Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function SocialDashboard() {
  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriendCards = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const friendsQuery = query(collection(db, 'friends'), where('userId', '==', user.uid));
          const friendsSnapshot = await getDocs(friendsQuery);
          const friendEmails = friendsSnapshot.docs.map(doc => doc.data().friendEmail);

          if (friendEmails.length > 0) {
            const cardsQuery = query(collection(db, 'cards'), where('userId', 'in', friendEmails));
            const cardsSnapshot = await getDocs(cardsQuery);
            const friendCards = cardsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCards(friendCards);
          } else {
            setError('No friends found.');
          }
          setUserName(user.displayName);
        } catch (err) {
          console.error('Error fetching friend cards:', err);
          setError('Failed to fetch friend cards.');
        }
      }
    };

    fetchFriendCards();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Social Dashboard</h2>
        </div>
        {error && <p>{error}</p>}
        <div className="cards-container">
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocialDashboard;
