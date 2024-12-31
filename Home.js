import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homee.css";
const HomePage = () => {
  const navigate = useNavigate();
  const handleRedirect = (role) => {
    navigate("/signin", { state: { role } }); // Pass role as state
  };
  // const handleAdminClick = () => {
  //   navigate("/Signin"); // Redirect to Admin page
  // };

  // const handleUserClick = () => {
  //   navigate("/Signin"); // Redirect to User page
  // };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Calendar Application for Communication Tracking</h1>
        <p>Efficiently manage and track your communications with ease.</p>
      </header>

      <main className="home-main">
        <div className="button-container">
          <button className="home-button" onClick={() => handleRedirect("admin")}>
            Admin
          </button>
          <button className="home-button" onClick={() => handleRedirect("user")}>
            User
          </button>
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Communication Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;