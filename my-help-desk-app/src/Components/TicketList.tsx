import React from "react";
import Ticket from "../Models/Ticket";
import { Card, CardContent, Typography } from "@mui/material";
import './TicketList.css'

type Props = {
  tickets: Ticket[];
  isLoading: boolean;
};

const TicketList: React.FC<Props> = ({ tickets, isLoading }) => {
  return (
    <div className="TicketList">
      <ul>
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.ticketId}/>
        ))}
      </ul>
    </div>
  );
};

type TicketProps = {
  ticket: Ticket;
};
const TicketCard: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div className="TicketCard">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">
            Ticket Id: {ticket.ticketId}
            <br />
            Created on: {ticket.createdAt}
            <br />
            User ID: {ticket.userId}
            <br />
            Ticket Status: {ticket.ticketStatus}
            <br />
            <br />
            Description: 
             <br />
            {ticket.description}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketList;
