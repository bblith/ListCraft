// src/components/Modal.js
import React, { useState } from 'react';
import './Modal.css';

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
        <h2>{title ? 'Edit Card' : 'New Card'}</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Card Title"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
