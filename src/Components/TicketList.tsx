import React from "react";
import Ticket, { TicketStatus } from "../Models/Ticket";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "./TicketList.css";

type Props = {
  tickets: Ticket[];
  isLoading: boolean;
};

const TicketList: React.FC<Props> = ({ tickets, isLoading }) => {
  return (
    <div className="TicketList">
      <ul>
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.ticketId} />
        ))}
      </ul>
    </div>
  );
};

type TicketProps = {
  ticket: Ticket;
};
const TicketCard: React.FC<TicketProps> = ({ ticket }) => {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.NEW:
        return "primary";
      case TicketStatus.IN_PROGRESS:
        return "secondary";
      case TicketStatus.RESOLVED:
        return "success";
      default:
        return "default";
    }
  };
  return (
    <div className="TicketCard">
      <Card sx={{ maxWidth: 600, margin: "1rem auto", padding: "1rem" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {ticket.subject || "No Subject"}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={ticket.ticketStatus}
              color={getStatusColor(ticket.ticketStatus)}
            />
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Created At: {new Date(ticket.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ticket ID: {ticket.ticketId}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            Description:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {ticket.description}
          </Typography>
          {ticket.messages && ticket.messages.length > 0 && (
            <>
              <Typography variant="body1" sx={{ marginTop: "1rem" ,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word", }}>
                Messages:
              </Typography>
              {ticket.messages.map((message, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  paragraph
                >
                  {message.content}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>{" "}
    </div>
  );
};

export default TicketList;
