import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import Ticket, { TicketStatus } from "../Models/Ticket";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../Context/AuthProvider";


interface Props {
  onSubmit: (ticket: Ticket) => void;
}

const CreateTicketPanel: React.FC<Props> = ({ onSubmit }) => {
    const {user} = useContext(AuthContext);

  const [formData, setFormData] = useState<Ticket>({
    ticketId: uuidv4() , 
    userId: user!.email ?? undefined, 
    engineerId: null,
    ticketStatus: TicketStatus.NEW,
    description: "",
    messages: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if userId and ticketId are set
    if (formData.userId !== "0" && formData.ticketId !== "0") {
      onSubmit(formData);
    } else {
      alert("Please fill in User ID and Ticket ID.");
    }
  };

  return (
    <div className="CreateTicketPanel">
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Create Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreateTicketPanel;
