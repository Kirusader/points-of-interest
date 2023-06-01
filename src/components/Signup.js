/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    async function checkIfUserExists(username) {
      const response = await fetch(
        `http://localhost:5001/user/users/${username}`
      );
      const data = await response.json();
      return !!data; // Return true if the username already exists
      console.log(data);
    }
    // Check if the username already exists in our database
    const isExistingUser = checkIfUserExists(username);
    if (!isExistingUser) {
      // If the username already exists, show an error message
      setErrorMessage(
        "Username already exists. Please choose a different username."
      );
      return;
    }

    // If the username is unique, proceed with registration
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch("http://localhost:5001/user/signup", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("User registered successfully!");
          navigate(`/login`);
        } else {
          alert("Registration failed.");
          navigate(`/signup`);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration error.");
      });
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
