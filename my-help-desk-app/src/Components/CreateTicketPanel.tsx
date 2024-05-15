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
import TicketService from "../Api/TicketService";
import { toast } from "react-toastify";
import './CreateTicketPanel.css'


type Props = {
    fetchUsersTickets: () => Promise<void>;
}

const CreateTicketPanel: React.FC<Props> = ({fetchUsersTickets} ) => {
    const {user} = useContext(AuthContext);

  const [formData, setFormData] = useState<Ticket>({
    ticketId: uuidv4() , 
    userId: user!.email ?? undefined, 
    engineerId: null,
    ticketStatus: TicketStatus.NEW,
    description: "",
    messages: [],
    createdAt: new Date().toISOString()
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.userId !== "0" && formData.ticketId !== "0") {
      await TicketService.createTicket(formData);
      toast.success(`Ticket ${formData.ticketId} created successfully`, {
        position: "top-center",
      });
      
      setFormData({
        ticketId: uuidv4() , 
        userId: user!.email ?? undefined, 
        engineerId: null,
        ticketStatus: TicketStatus.NEW,
        description: "",
        messages: [],
        createdAt: new Date().toISOString()
      });

    fetchUsersTickets();
    } 
  };

  return (
    <div className="CreateTicketPanel">
      <Container maxWidth="sm">
        <div className="CreateTicketPanel__title">
        <Typography variant="h6" align="left" gutterBottom>
          Please describe your Issue:
        </Typography>
        </div>
        
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
