import React, { useState } from "react";
import "./App.css";

const FacebookLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your code for sending data to your API here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
          className="logo"
        />
        <input
          type="email"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Log In
        </button>
      </form>
      <div className="footer">
        <p className="footerText">
          New to Facebook? <a href="#">Sign up</a>
        </p>
        <p className="footerText">
          Forgot password? <a href="#">Request password reset</a>
        </p>
      </div>
    </div>
  );
};

export default FacebookLogin;