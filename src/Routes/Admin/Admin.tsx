import React from "react";
import { auth } from "../../firebase";
import { Typography, Button } from "@mui/material";
import AdminBoard from "../../Components/AdminBoard/AdminBoard";
import './Admin.css';

const AdminContainer: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <div className="AdminContainer">
      <div className="AdminTitle">
        <div className="AdminTitleText">
        <Typography variant="h5">Hello AdminBot</Typography>
        </div>
        <div className="LogoutButton">
        <Button className="logoutButton" onClick={handleLogout}>
          Logout
        </Button>
        </div>
      </div>
      <div className="AdminContainerBody">
        <AdminBoard />
      </div>
    </div>
  );
};

export default AdminContainer;
