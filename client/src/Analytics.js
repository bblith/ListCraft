import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { auth, db } from './Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Analytics() {
  const [totalCards, setTotalCards] = useState(0);
  const [tagCounts, setTagCounts] = useState({
    doing: 0,
    complete: 0,
    backlog: 0,
    unassigned: 0,
    restructure: 0
  });
  const [totalListItems, setTotalListItems] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const cardsQuery = query(collection(db, 'cards'), where('userId', '==', user.uid));
          const cardsSnapshot = await getDocs(cardsQuery);

          const cards = cardsSnapshot.docs.map(doc => doc.data());
          console.log('Fetched cards:', cards);

          const newTagCounts = {
            doing: 0,
            complete: 0,
            backlog: 0,
            unassigned: 0,
            restructure: 0
          };
          let totalItems = 0;

          cards.forEach(card => {
            if (card.tag) {
              newTagCounts[card.tag] = (newTagCounts[card.tag] || 0) + 1;
            }
            totalItems += (card.listItems || []).length;
          });

          console.log('Total Cards:', cards.length);
          console.log('Tag Counts:', newTagCounts);
          console.log('Total List Items:', totalItems);

          setTotalCards(cards.length);
          setTagCounts(newTagCounts);
          setTotalListItems(totalItems);
        } catch (error) {
          console.error('Error fetching analytics data:', error);
        }
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Analytics</h2>
        </div>
        <div className="cards-container">
          <div className="card">
            <h3>Total Cards</h3>
            <p className="analytics-value">{totalCards}</p>
          </div>
          <div className="card">
            <h3>Total List Items</h3>
            <p className="analytics-value">{totalListItems}</p>
          </div>
          <div className="card">
            <h3>Doing</h3>
            <p className="analytics-value">{tagCounts.doing}</p>
          </div>
          <div className="card">
            <h3>Complete</h3>
            <p className="analytics-value">{tagCounts.complete}</p>
          </div>
          <div className="card">
            <h3>Backlog</h3>
            <p className="analytics-value">{tagCounts.backlog}</p>
          </div>
          <div className="card">
            <h3>Unassigned</h3>
            <p className="analytics-value">{tagCounts.unassigned}</p>
          </div>
          <div className="card">
            <h3>Restructure</h3>
            <p className="analytics-value">{tagCounts.restructure}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
