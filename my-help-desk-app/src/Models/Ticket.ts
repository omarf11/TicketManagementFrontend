import Message from "./Message";

export enum TicketStatus {
    NEW,
    IN_PROGRESS,
    RESOLVED,
  }

  export default interface Ticket {
    ticketId: string;
    userId?: string;
    engineerId?: number | null;
    ticketStatus: TicketStatus;
    description: string;
    messages?: Message[];
  }
  