
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

interface PrivateRouteProps {
   children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {user} = useContext(AuthContext);

  if (!user) {
    return <Navigate to = "/login" replace/>
  }else{
    return <>{children}</>;  }
};

export default PrivateRoute;

