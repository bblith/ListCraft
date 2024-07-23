import React, { useState } from 'react';
import './Card.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Card({ id, title, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = (newTitle) => {
    onUpdate(id, newTitle);
    closeModal();
  };

  return (
    <div>
      <div className="card">
        <h3>{title}</h3>
        <div className="card-actions">
          <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={openModal} />
          <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDelete} />
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} title={title} onSave={handleUpdate} />}
    </div>
  );
}

export default Card;
