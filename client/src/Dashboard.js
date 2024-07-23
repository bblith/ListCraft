// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Card from './Card';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from './Firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function Dashboard() {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userName, setUserName] = useState('');

  const fetchCards = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'cards'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const userCards = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCards(userCards);
      setUserName(user.displayName);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const openModal = (card = null) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const saveCard = async (id, title, tag, listItems) => {
    const user = auth.currentUser;
    if (user) {
      if (id) {
        // Update existing card
        const cardRef = doc(db, 'cards', id);
        await updateDoc(cardRef, { title, tag, listItems });
      } else {
        // Add new card
        await addDoc(collection(db, 'cards'), {
          userId: user.uid,
          title,
          tag,
          listItems,
          createdAt: new Date()
        });
      }
      fetchCards();
      closeModal();
    }
  };

  const deleteCard = async (id) => {
    await deleteDoc(doc(db, 'cards', id));
    fetchCards();
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">Welcome, {userName}!</h2>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>DASHBOARD</h2>
          <FontAwesomeIcon icon={faPlus} className="add-card-icon" onClick={() => openModal()} />
        </div>
        <div className="cards-container">
          {cards.map(card => (
            <Card key={card.id} card={card} onEdit={() => openModal(card)} onDelete={() => deleteCard(card.id)} />
          ))}
        </div>
        {isModalOpen && <Modal onClose={closeModal} onSaveCard={saveCard} card={selectedCard} />}
      </div>
    </div>
  );
}

export default Dashboard;
