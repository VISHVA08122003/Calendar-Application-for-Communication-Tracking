import React, { useState, useEffect } from 'react';
import './Admin.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Admin = () => {
  const [companies, setCompanies] = useState([]); // Placeholder for company data
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState([]); // Placeholder for alerts and reminders
  const navigate = useNavigate('');
  const z = () =>{
    navigate('/Calendar');
  }
  useEffect(() => {
    // Simulate fetching company data and alerts
    setCompanies([
      { id: 1, name: 'Company A', location: 'New York', periodicity: '2 weeks', lastContact: '2024-12-10', overdue: true },
      { id: 2, name: 'Company B', location: 'London', periodicity: '1 month', lastContact: '2024-11-20', overdue: false },
    ]);
    setAlerts([
      { id: 1, message: 'Follow-up overdue for Company A', type: 'warning' },
    ]);
  }, []);
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const dataVisualization = {
    labels: companies.map((company) => company.name),
    datasets: [
      {
        label: 'Days Since Last Contact',
        data: companies.map((company) => {
          const lastContact = new Date(company.lastContact);
          const today = new Date();
          return Math.floor((today - lastContact) / (1000 * 60 * 60 * 24));
        }),
        backgroundColor: ['#007bff', '#ff5733'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Company Name',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Days Since Last Contact',
        },
      },
    },
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage your communication tracking effectively.</p>
      </header>

      {/* Alerts Section */}
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {/* Company Management Section */}
      <section className="section">
        <h2>Company Management</h2>
        <div className="company-list">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div key={company.id} className={`company-card ${company.overdue ? 'overdue' : ''}`}>
                <h3>{company.name}</h3>
                <p>Location: {company.location}</p>
                <p>Periodicity: {company.periodicity}</p>
                <p>Last Contact: {company.lastContact}</p>
                <button className="action-button">Follow-up Now</button>
                <button className="action-button">View History</button>
                <button className='action-button' onClick={z}>Calendar</button>
              </div>
            ))
          ) : (
            <p>No companies found. Add companies to get started.</p>
          )}
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className="section">
        <h2>Communication Trends</h2>
        <Bar data={dataVisualization} options={options} />
      </section>

      {/* Communication Tracking Section */}
      <section className="section">
        <h2>Communication Tracking</h2>
        {filteredCompanies.map((company) => (
          <div key={company.id} className="tracking-card">
            <h3>{company.name} - Communication Log</h3>
            <ul>
              <li>2024-12-01: Sent LinkedIn Message</li>
              <li>2024-11-15: Shared LinkedIn Post</li>
              {/* Add dynamic logs as needed */}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
