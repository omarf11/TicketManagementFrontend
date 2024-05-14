import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {  TabPanel, TabContext, TabList} from '@mui/lab';
import {Tab,Box, Button} from '@mui/material';

import TicketList from "../../Components/TicketList";

interface UserDetails {
  email: string;
}



function UserTabs() {
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
        <TabPanel value='1'> Create a Ticket </TabPanel>
        <TabPanel value='2'> <TicketList/></TabPanel>
      </TabContext>
      

    </Box>
  );
}

const UserView: React.VFC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      if (user) {
        setUserDetails(user as UserDetails);
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <h3>Welcome to TicketBot</h3>
          <div>
            <p>Email: {userDetails.email}</p>
          </div>
          <div>
            <UserTabs/>
          </div>
          <Button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserView;
