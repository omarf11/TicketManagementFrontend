import Ticket, { TicketStatus } from "../Models/Ticket";
import API from "../constants/api";
import axios from "axios";

class TicketService {
  static URL = API.TICKET;

  static async getUsersTickets(userId: string | null): Promise<Ticket[]> {
    try {
      if (!userId || userId.trim() === "") {
        throw new Error("Invalid userId parameter");
      }
      const response = await axios.get(`${this.URL}/user/${userId}`);
      const data: Ticket[] = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw new Error("Failed to fetch tickets");
    }
  }

  static async createTicket(newTicket: Ticket): Promise<Ticket> {
    try {
      const response = await axios.post(this.URL, newTicket);
      const data: Ticket = response.data;
      return data;
    } catch (error) {
      throw new Error("Failed to create tickets: ");
    }
  }

  static async updateTicketStatus(newStatus: TicketStatus): Promise<Ticket> {
    try {
      const response = await axios.get(this.URL);
      const data: Ticket[] = response.data;
      return data[-1];
    } catch (error) {
      throw new Error("Failed to update ticket status: ");
    }
  }
}

export default TicketService;
