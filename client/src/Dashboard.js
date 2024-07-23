import React, { useState } from 'react';
import './Dashboard.css';
import Card from './Card';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      <div className="dashboard-header">
        <h2>DASHBOARD</h2>
        <FontAwesomeIcon icon={faPlus} className="add-card-icon" onClick={openModal} />
      </div>
      <div className="cards-container">
        {cards.map(card => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>
      {isModalOpen && <Modal onClose={closeModal} onAddCard={addCard} />}
    </div>
  );
}

export default Dashboard;
