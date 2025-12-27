import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert("Login successful");
      navigate("/users");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
        <Navbar/>
<div className="container">
    <div className="row mt-5 mb-5">
        <div className="col-lg-2"></div>
        <div className="col-lg-8"> <h2 style={{fontSize:"50px", color:"#ff8247", textAlign:"center"}}>Login</h2>
      <form onSubmit={handleLogin}>
        <label className="form-label" style={{fontSize:"20px", color:"#ff8247"}}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-2"
        />
        <label className="form-label" style={{fontSize:"20px", color:"#ff8247"}}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-sm w-40"  style={{backgroundColor:"#ff8247", color:"white"}}>
          Login
        </button>
      </form></div>
      <div className="col-lg-2"></div>
    </div>
    
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
