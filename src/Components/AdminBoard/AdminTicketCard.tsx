import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Ticket, { TicketStatus } from "../../Models/Ticket";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import "./AdminTicketCard.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminMessageDialog from "./AdminDialog";

type TicketProps = {
  currTicket: Ticket;
  index: number;
};
const AdminTicketCard: React.FC<TicketProps> = ({ currTicket, index }) => {
  const [ticket , setTicket] = useState<Ticket>(currTicket);
  const [openDialog, setOpenDialog] = useState(false);


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

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };



  return (
    <Draggable draggableId={ticket.ticketId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className="AdminTicketCard"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Accordion sx={{ maxWidth: 600, margin: "1rem auto" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "inline" }}
                  >
                    {ticket.subject || "No Subject"}
                  </Typography>
                  <Chip
                    label={ticket.ticketStatus}
                    color={getStatusColor(ticket.ticketStatus)}
                    sx={{ marginLeft: "0.5rem" }} // Add some spacing between subject and status
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Ticket ID: {ticket.ticketId}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: {ticket.userId}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                Description:
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph sx={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",}}>
                {ticket.description}
              </Typography>
              {ticket.messages && ticket.messages.length > 0 && (
                <>
                  <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                    Messages:
                  </Typography>
                  {ticket.messages.map((message, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",}}
                    >
                      {message.content}
                    </Typography>
                  ))}
                </>
              )}
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "1rem" }}
                onClick={handleClickOpen}
              >
                Add Message
              </Button>
              <AdminMessageDialog ticketId={ticket.ticketId} isOpen = {openDialog} closeDialog={handleClose} updateTicket = {setTicket} />
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </Draggable>
  );
};

export default AdminTicketCard;
