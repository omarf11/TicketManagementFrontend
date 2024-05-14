import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password).then((user)=>{

      if (user) {
        console.log("inside of user");
        console.log(user.user.email)
        navigate('/create');
      }

      console.log("User Registered Successfully!");
      
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });

    })
    .catch((error)=>{
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    });
  };

  return (
    <form onSubmit={(e)=>handleRegister(e)}>
      <h3>Register</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <Button type="submit" className="btn btn-primary">
          Sign Up
        </Button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}
export default Register;
