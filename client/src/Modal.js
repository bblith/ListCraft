// src/components/Modal.js
import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const tags = [
  { label: 'Doing', value: 'doing', colorClass: 'tag-option-doing' },
  { label: 'Complete', value: 'complete', colorClass: 'tag-option-complete' },
  { label: 'Backlog', value: 'backlog', colorClass: 'tag-option-backlog' },
  { label: 'Unassigned', value: 'unassigned', colorClass: 'tag-option-unassigned' },
  { label: 'Restructure', value: 'restructure', colorClass: 'tag-option-restructure' },
];

function Modal({ onClose, onSaveCard, card }) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('unassigned');
  const [listItems, setListItems] = useState([]);
  const [newListItem, setNewListItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setTag(card.tag);
      setListItems(card.listItems || []);
    }
  }, [card]);

  const handleSave = () => {
    if (title.trim()) {
      console.log('Saving card:', { title, tag, listItems });
      onSaveCard(card ? card.id : null, title, tag, listItems);
      onClose();
    }
  };

  const addListItem = () => {
    if (newListItem.trim()) {
      if (editingIndex >= 0) {
        const updatedListItems = [...listItems];
        updatedListItems[editingIndex] = newListItem;
        setListItems(updatedListItems);
        setEditingIndex(-1);
        console.log('Updated list item:', updatedListItems);
      } else {
        setListItems([...listItems, newListItem]);
        console.log('Added new list item:', newListItem);
      }
      setNewListItem('');
    } else {
      console.log('New list item is empty');
    }
  };

  const editListItem = (index) => {
    setNewListItem(listItems[index]);
    setEditingIndex(index);
    console.log('Editing list item:', listItems[index]);
  };

  const deleteListItem = (index) => {
    const updatedListItems = listItems.filter((_, i) => i !== index);
    setListItems(updatedListItems);
    console.log('Deleted list item at index:', index);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{card ? 'Edit Card' : 'New Card'}</h2>
          <div className="close-container">
            <select className="tag-dropdown" value={tag} onChange={(e) => setTag(e.target.value)}>
              {tags.map(tag => (
                <option key={tag.value} value={tag.value} className={tag.colorClass}>
                  {tag.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
          </div>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card Title"
        />
        <div className="list-item-container">
          {listItems.map((item, index) => (
            <div key={index} className="list-item">
              <span>{item}</span>
              <div className="list-item-actions">
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => editListItem(index)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => deleteListItem(index)} />
              </div>
            </div>
          ))}
        </div>
        <div className="add-list-item">
          <input
            type="text"
            value={newListItem}
            onChange={(e) => setNewListItem(e.target.value)}
            placeholder="New List Item"
          />
          <FontAwesomeIcon icon={faPlus} className="add-icon" onClick={addListItem} />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Modal;
