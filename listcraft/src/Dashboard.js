// src/components/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';
import Card from './Card';
import Modal from './Modal';

function Dashboard() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Sample List 1' },
    { id: 2, title: 'Sample List 2' },
    { id: 3, title: 'Sample List 3' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addCard = (title) => {
    const newCard = { id: cards.length + 1, title };
    setCards([...cards, newCard]);
    closeModal();
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards-container">
        {cards.map(card => (
          <Card key={card.id} title={card.title} />
        ))}
        <div className="add-card" onClick={openModal}>
          <h3>+ Add New Card</h3>
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} onAddCard={addCard} />}
    </div>
  );
}

export default Dashboard;
