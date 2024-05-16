import Message from "./Message";

export enum TicketStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
  }

  export default interface Ticket {
    ticketId: string;
    userId?: string;
    engineerId?: number | null;
    ticketStatus: TicketStatus;
    description: string;
    messages?: Message[];
    createdAt:string;
  }
  