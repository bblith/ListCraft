import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Card from './Card';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from './Firebase'; // Import Firestore
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

function Dashboard() {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const querySnapshot = await getDocs(collection(db, 'cards'));
    const cardsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setCards(cardsData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addCard = async (title) => {
    const newCard = { title };
    const docRef = await addDoc(collection(db, 'cards'), newCard);
    setCards([...cards, { ...newCard, id: docRef.id }]);
    closeModal();
  };

  const deleteCard = async (id) => {
    await deleteDoc(doc(db, 'cards', id));
    setCards(cards.filter(card => card.id !== id));
  };

  const updateCard = async (id, updatedTitle) => {
    const cardDoc = doc(db, 'cards', id);
    await updateDoc(cardDoc, { title: updatedTitle });
    setCards(cards.map(card => (card.id === id ? { ...card, title: updatedTitle } : card)));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>DASHBOARD</h2>
        <FontAwesomeIcon icon={faPlus} className="add-card-icon" onClick={openModal} />
      </div>
      <div className="cards-container">
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            onDelete={deleteCard}
            onUpdate={updateCard}
          />
        ))}
      </div>
      {isModalOpen && <Modal onClose={closeModal} onAddCard={addCard} />}
    </div>
  );
}

export default Dashboard;
