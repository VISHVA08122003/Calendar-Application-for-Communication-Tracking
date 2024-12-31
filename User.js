import React, { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Userr.css";

const localizer = momentLocalizer(moment);

const Hope = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setCompanies([
      {
        id: 1,
        name: "Company A",
        lastFive: [
          { type: "LinkedIn Post", date: "2024-12-01" },
          { type: "Email", date: "2024-11-25" }
        ],
        nextScheduled: { type: "Phone Call", date: "2024-12-15" },
        overdue: true
      },
      {
        id: 2,
        name: "Company B",
        lastFive: [
          { type: "LinkedIn Message", date: "2024-12-05" },
          { type: "Email", date: "2024-12-01" }
        ],
        nextScheduled: { type: "Visit", date: "2024-12-20" },
        overdue: false
      }
    ]);

    setEvents([
      {
        title: "LinkedIn Post: Company A",
        start: new Date("2024-12-01"),
        end: new Date("2024-12-01")
      },
      {
        title: "Email: Company B",
        start: new Date("2024-12-05"),
        end: new Date("2024-12-05")
      }
    ]);
  }, []);

  const handleCommunicationAction = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const submitCommunication = (type, date, notes) => {
    if (selectedCompany) {
      // Update company data
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === selectedCompany.id
            ? {
                ...company,
                lastFive: [
                  { type, date },
                  ...company.lastFive.slice(0, 4)
                ],
                overdue: false
              }
            : company
        )
      );

      // Add event to calendar
      setEvents((prev) => [
        ...prev,
        {
          title: `${type}: ${selectedCompany.name}`,
          start: new Date(date),
          end: new Date(date)
        }
      ]);

      setShowModal(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Communication Tracker</h1>
      </header>

      <section className="dashboard">
        <h2>Dashboard</h2>
        <table className="company-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Last Five Communications</th>
              <th>Next Scheduled Communication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className={company.overdue ? "overdue" : ""}
              >
                <td>{company.name}</td>
                <td>
                  {company.lastFive.map((com, index) => (
                    <div key={index} title={`Notes: ${com.notes || "N/A"}`}>
                      {com.type} ({com.date})
                    </div>
                  ))}
                </td>
                <td>
                  {company.nextScheduled.type} ({company.nextScheduled.date})
                </td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleCommunicationAction(company)}
                  >
                    Log Communication
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="calendar-section">
        <h2>Calendar View</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "20px 0" }}
        />
      </section>

      {showModal && (
        <CommunicationModal
          company={selectedCompany}
          onClose={() => setShowModal(false)}
          onSubmit={submitCommunication}
        />
      )}
    </div>
  );
};

const CommunicationModal = ({ company, onClose, onSubmit }) => {
  const [type, setType] = useState("LinkedIn Post");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit(type, date, notes);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Log Communication for {company.name}</h3>
        <label>
          Type of Communication:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>LinkedIn Post</option>
            <option>LinkedIn Message</option>
            <option>Email</option>
            <option>Phone Call</option>
            <option>Visit</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Hope;
