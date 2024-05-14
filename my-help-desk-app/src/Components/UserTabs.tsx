import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import TicketList from "./TicketList";
import CreateTicketPanel from "./CreateTicketPanel";

export default function UserTabs() {
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <TabContext value = {value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList aria-label="ticketbot tabs" onChange={handleChange}>
              <Tab label="Create a Ticket" value='1' />
              <Tab label="My Tickets" value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'> <CreateTicketPanel onSubmit={()=>{}} /> </TabPanel>
          <TabPanel value='2'> <TicketList/></TabPanel>
        </TabContext>
        
  
      </Box>
    );
  }