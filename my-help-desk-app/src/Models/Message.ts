
enum UserTypes{
USER,
SUPPORT
}

export default interface Message {
    messageId: number;
    senderId: number;
    userType: UserTypes; // Assuming UserTypes is a valid type or enum
    dateSent: string; // Assuming dateSent is a Date type in a specific format
    content: string;
    ticketId: number;
  }
  