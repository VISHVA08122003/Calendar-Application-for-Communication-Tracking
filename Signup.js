import React, { useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import "./SignUp.css"; // Add your custom styling here

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!validateUsername(username)) {
      setError("Username must contain '@gmail.com' or '@yahoo.com'.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be greater than 10 characters and include at least one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("New Password and Retype Password do not match.");
      return;
    }

    // Save username and password to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    setError("");
    alert("Sign-Up Successful! Redirecting to Sign-In page.");
    navigate("/signin", { state: { role } });
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
          <label htmlFor="password">New Password</label>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Retype Password</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
          
            </span>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
