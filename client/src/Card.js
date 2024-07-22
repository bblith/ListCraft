// src/components/Card.js
import React, { useState } from 'react';
import './Card.css';
import Modal from './Modal';

function Card({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="card" onClick={openModal}>
        <h3>{title}</h3>
      </div>
      {isModalOpen && <Modal onClose={closeModal} title={title} />}
    </div>
  );
}

export default Card;
