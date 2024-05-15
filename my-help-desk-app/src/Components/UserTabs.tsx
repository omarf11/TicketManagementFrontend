import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TicketList from "./TicketList";
import CreateTicketPanel from "./CreateTicketPanel";
import TicketService from "../Api/TicketService";
import { AuthContext } from "../Context/AuthProvider";
import Ticket from "../Models/Ticket";

export default function UserTabs() {
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useContext(AuthContext);
  
  
  
    const fetchUsersTickets = async () => {
      try {
        if (user) {
          const ticketsData = await TicketService.getUsersTickets(user.email);
          setTickets(ticketsData);  
        }
       
        setLoading(false);
      } catch (error) {
        setError("Error fetching tickets. Please try again later.");
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsersTickets();
    }, []);
  
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <TabContext value = {value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList aria-label="ticketbot tabs" onChange={handleChange}>
              <Tab label="Create a Ticket" value='1' />
              <Tab label="My Tickets" value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'> <CreateTicketPanel fetchUsersTickets={fetchUsersTickets} /> </TabPanel>
          <TabPanel value='2'> <TicketList tickets ={tickets}  isLoading ={loading} /></TabPanel>
        </TabContext>

      </Box>
    );
  }