import React, { useEffect, useState } from 'react';
import Ticket from '../Models/Ticket';
import TicketService from '../Api/TicketService';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const ticketsData = await TicketService.getAllTickets();
      setTickets(ticketsData);
      setLoading(false);
    } catch (error) {
      setError("Error fetching tickets. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Ticket List</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.ticketId}>
            <p>User ID: {ticket.userId}</p>
            <p>Ticket Status: {ticket.ticketStatus}</p>
            <p>Description: {ticket.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
