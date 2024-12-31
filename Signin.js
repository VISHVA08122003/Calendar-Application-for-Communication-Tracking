import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./SignIn.css"; // Custom CSS for styling

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role; 
  const validateUsername = (username) => {
    return username.endsWith("@gmail.com") || username.endsWith("@yahoo.com");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{11,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Validate username format
    if (!validateUsername(username)) {
      setError("Username must contain '@gmail.com' or '@yahoo.com'.");
      return;
    }

    // Validate password format
    if (!validatePassword(password)) {
      setError(
        "Password must be greater than 10 characters and include at least one special character."
      );
      return;
    }

    // Validate entered credentials
    if (username === storedUsername && password === storedPassword) {
      setError("");
      alert("Sign-In Successful!");
      navigate(`/${role}`); // Navigate to the next page (e.g., Admin page)
    } 

    else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              
            </span>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Sign In
        </button>
      </form>
      <div className="new-user-option">
        <p>New user?</p>
        <button
          className="sign-up-button"
          onClick={() => navigate("/Signup", { state: { role } })}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
