import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Ticket from "../../Models/Ticket";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import "./AdminTicketCard.css"

type TicketProps = {
  ticket: Ticket;
  index: number;
};
const AdminTicketCard: React.FC<TicketProps> = ({ ticket, index }) => {
    return (
      <Draggable draggableId={ticket.ticketId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            className="AdminTicketCard"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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
        )}
      </Draggable>
    );
  };

export default AdminTicketCard;
