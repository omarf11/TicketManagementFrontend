import React, { useContext } from "react";
import { auth } from "../../firebase";
import UserTabs from "../../Components/UserTabs";
import { Button } from "@mui/material";
import { AuthContext } from "../../Context/AuthProvider";

export interface UserDetails {
  email: string;
}




const UserViewContainer: React.FC = () => {
  
  const {user} = useContext(AuthContext);

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
      {user ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <h3>Welcome to TicketBot</h3>
          <div>
            <p>Email: {user.email}</p>
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

export default UserViewContainer;
