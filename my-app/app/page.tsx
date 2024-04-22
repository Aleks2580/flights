'use client'
import React, { useState, useEffect } from 'react';
import { fetchTickets } from './lib/api';
import Tickets from './ui/tickets';
import type { Ticket } from './lib/definitions';
import styles from './page.module.css';

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [stopsFilter, setStopsFilter] = useState<Set<number>>(new Set());
  const [availableStops, setAvailableStops] = useState<number[]>([]);

  useEffect(() => {
    // Имитация запроса на сервер
    fetchTickets().then(data => {
      setTickets(data);
      setFilteredTickets(data);
      const stops = new Set(data.map(ticket => ticket.stops));
      setAvailableStops([...stops]);
    });
  }, []);

  const handleFilterChange = (stop: number, checked: boolean) => {
    let newStopsFilter = new Set(stopsFilter);
    if (stop === -1) {  // Все checkbox
      if (checked) {
        newStopsFilter = new Set(availableStops.concat([0]));  // Без пересадок
      } else {
        newStopsFilter.clear();
      }
    } else {
      if (checked) {
        newStopsFilter.add(stop);
      } else {
        newStopsFilter.delete(stop);
      }
    }
    
    setStopsFilter(newStopsFilter);
    filterTickets(newStopsFilter);
  };

  const filterTickets = (stops: Set<number>) => {
    const filtered = stops.size > 0 ? tickets.filter(ticket => stops.has(ticket.stops)) : tickets;
    setFilteredTickets(filtered);
  };

  const isAllSelected = availableStops.length > 0 && availableStops.every(stop => stopsFilter.has(stop)) && stopsFilter.has(0);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <h6 className={styles.title}>ВАЛЮТА</h6>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => {}}>RUB</button>
            <button className={styles.button} onClick={() => {}}>USD</button>
            <button className={styles.button} onClick={() => {}}>EUR</button>
          </div>
        </div>
        <div className={styles.sidebarSection}>
          <h6 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h6>
          <label key="all" className={styles.checkboxLabel}>
            <input type="checkbox"
                   checked={isAllSelected}
                   onChange={(e) => handleFilterChange(-1, e.target.checked)}
                   className={styles.checkboxInput} />
            Все
          </label>
          <label key="none" className={styles.checkboxLabel}>
            <input type="checkbox"
                   checked={stopsFilter.has(0)}
                   onChange={(e) => handleFilterChange(0, e.target.checked)}
                   className={styles.checkboxInput} />
            Без пересадок
          </label>
          {availableStops.map(stop => stop > 0 && (
            <label key={stop} className={styles.checkboxLabel}>
              <input type="checkbox"
                     checked={stopsFilter.has(stop)}
                     onChange={(e) => handleFilterChange(stop, e.target.checked)}
                     className={styles.checkboxInput} />
              {stop} пересадк{stop === 1 ? 'а' : 'и'}
            </label>
          ))}
        </div>
      </aside>
      <main className={styles.mainContent}>
        <Tickets tickets={filteredTickets} />
      </main>
    </div>
  );
};

export default Home;
