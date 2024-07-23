// src/components/Card.js
import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Card({ card, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-content">
        <span className={`tag-dot ${card.tag}`}></span>
        <h3>{card.title}</h3>
      </div>
      <div className="card-actions">
        <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={onEdit} />
        <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={onDelete} />
      </div>
    </div>
  );
}

export default Card;
