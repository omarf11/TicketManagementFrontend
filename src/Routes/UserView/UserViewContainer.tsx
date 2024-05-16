import React, { useContext } from "react";
import { auth } from "../../firebase";
import UserTabs from "../../Components/UserTabs";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../Context/AuthProvider";
import "./UserViewContainer.css";

export interface UserDetails {
  email: string;
}

const UserViewContainer: React.FC = () => {
  const { user } = useContext(AuthContext);

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
    <div className="UserViewContainer">
      {user && (
        <>
          <div className="title">
            <Typography variant="h5">Welcome To TicketBot</Typography>
            <Button className="logoutButton" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div>
            <p>{user.email}</p>
          </div>
          <div>
            <UserTabs />
          </div>
        </>
      )}
    </div>
  );
};

export default UserViewContainer;
