// src/components/Modal.js
import React, { useState } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modal({ onClose, onAddCard, title }) {
  const [newTitle, setNewTitle] = useState(title || '');

  const handleSave = () => {
    if (newTitle.trim()) {
      onAddCard(newTitle);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title ? 'Edit Card' : 'New Card'}</h2>
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
        </div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Card Title"
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Modal;
