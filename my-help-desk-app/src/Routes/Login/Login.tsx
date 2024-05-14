import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUMBIT LOIGN")
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("User logged in Successfully: " , user);

        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        
        navigate("/create");
      })
      .catch((error) => {
        console.log(error.message);

        toast.error(error.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <div className="Login">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Login</h3>

        <div className="Login_email">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="Login_password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="Login__submitBtn">
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </div>
        <p className="Login__register">
          New user <a href="/register">Register Here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
