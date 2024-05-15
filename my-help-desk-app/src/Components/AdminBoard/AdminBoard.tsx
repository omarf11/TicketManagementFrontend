import React, { useContext, useEffect, useState } from "react";
import TicketService from "../../Api/TicketService";
import { AuthContext } from "../../Context/AuthProvider";
import Ticket from "../../Models/Ticket";

const AdminBoard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  const fetchTickets = async () => {
    try {
      setLoading(false);
      const ticketsData = await TicketService.getAllTickets();
      setTickets(ticketsData);
    } catch (error) {
      setError("Error fetching tickets. Please try again later.");
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchTickets();
  }, []);

  return <div className="AdminBoard">ADMIN BOARD</div>;
};

export default AdminBoard;
