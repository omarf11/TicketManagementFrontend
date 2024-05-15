import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase";
import { Typography, Button } from "@mui/material";
import AdminBoard from "../../Components/AdminBoard/AdminBoard";

const AdminContainer: React.FC = () => {

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
    <div className="AdminContainer">
      <Typography variant="h5">Hello AdminBot</Typography>
      <Button className="logoutButton" onClick={handleLogout}>
        Logout
      </Button>
      <div>
        <AdminBoard/>
      </div>
    </div>
  );
};

export default AdminContainer;
