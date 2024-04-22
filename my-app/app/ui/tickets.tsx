// import React from "react";
import styles from "./Tickets.module.css";
import { Props } from "../lib/definitions";

const Tickets: React.FC<Props> = ({ tickets }) => {
  const renderStopsText = (stops: number): string => {
    if (stops === 0) {
      return "прямой"; 
    } else if (stops === 1) {
      return "1 пересадка";
    } else {
      return `${stops} пересадки`; 
    }
  };
  return (
    <div className={styles.container}>
      {tickets.map((ticket, index) => (
        <div key={index} className={styles.ticket}>
          <div className={styles.ticketLeft}>
            <div className={styles.airlineLogo}>
              <img
                src={`/${ticket.carrier}.png`}
                className={styles.logo}
                alt={ticket.carrier}
              />
            </div>
            <button className={styles.buyButton}>
              Купить <br /> за {ticket.price} ₽
            </button>
          </div>
          <div className={styles.ticketRight}>
            <div className={styles.departureTime}>
              <span>{ticket.departure_time}</span>
              <br />
              <span className={styles.city}>{ticket.origin}</span>  
            </div>
            <div className={styles.arrowPlane}>
              <span className={styles.stops}>{renderStopsText(ticket.stops)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    className={styles.plane}
                  >
                    <path
                      fill="#898294"
                      d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"
                    ></path>
                  </svg>
                </div>
            <div className={styles.destinationTime}>
              <span>{ticket.arrival_time}</span>
              <br />
              <span className={styles.city}>{ticket.destination}</span>    
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
