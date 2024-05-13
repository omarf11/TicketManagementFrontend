import Ticket from "../Models/Ticket";
import API from "../constants/api";
import axios from 'axios'

class TicketService {
static URL = API.TICKET;
static async getAllTickets(): Promise<Ticket[]> {
    try {
        const response  = await axios.get(this.URL)
        const data:Ticket[] =response.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch tickets: ");
    }
}

}

export default TicketService;