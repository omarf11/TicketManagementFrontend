import Message from "./Message";

enum TicketStatus {
    NEW,
    IN_PROGRESS,
    RESOLVED,
  }

  export default interface Ticket {
    ticketId: number;
    userId: number;
    engineerId?: number | null;
    ticketStatus: TicketStatus;
    description: string;
    messages?: Message[];
  }
  