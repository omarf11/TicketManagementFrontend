import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { AuthContext } from "../../Context/AuthProvider";
import TicketService from "../../Api/TicketService";
import Ticket from "../../Models/Ticket";

type Props = {
  ticketId: string;
  isOpen: boolean;
  closeDialog: () => void;
  updateTicket: (newTicket:Ticket) => void;
};

const AdminMessageDialog: React.FC<Props> = ({
  ticketId,
  isOpen,
  closeDialog,
  updateTicket
}) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
   const t =  await TicketService.addMessageToTicket(ticketId, {
      messageId: nanoid(8),
      senderId: user!.email ?? undefined,
      dateSent: new Date().toISOString(),
      content: message,
    });

    updateTicket(t);
    closeDialog();

  };
  return (
    <div className="AdminMessageDialog">
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>Add a new message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your message below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminMessageDialog;
