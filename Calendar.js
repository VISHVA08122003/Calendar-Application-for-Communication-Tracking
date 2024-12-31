import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import "react-big-calendar/lib/css/react-big-calendar.css";
 // Add custom styling here

const localizer = momentLocalizer(moment);

const Cal = () => {
  const [events, setEvents] = useState([]); // Drag-and-drop calendar events
  const [companies, setCompanies] = useState([]); // Company data
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]); // Alerts and reminders

  useEffect(() => {
    // Simulated data fetching
    setCompanies([
      { id: 1, name: "Company A", location: "New York", periodicity: "2 weeks", industry: "Finance" },
      { id: 2, name: "Company B", location: "London", periodicity: "1 month", industry: "Tech" },
    ]);
    setAlerts([{ id: 1, message: "Follow-up overdue for Company A", type: "warning" }]);
    setEvents([
      { id: 1, title: "Follow-up with Company A", start: new Date(), end: new Date(moment().add(1, "hours")) },
    ]);
  }, []);

//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//   };

//   const filteredCompanies = companies.filter((company) =>
//     company.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const dataVisualization = {
//     labels: companies.map((company) => company.name),
//     datasets: [
//       {
//         label: "Engagement Score",
//         data: companies.map(() => Math.random() * 100),
//         backgroundColor: ["#007bff", "#ff5733"],
//       },
//     ],
//   };

  const onEventDrop = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
    );
  };

  return (
    <div className="app-container">
      

      <section className="section">
        <h2>Drag-and-Drop Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onEventDrop={onEventDrop}
          resizable
        />
      </section>
    </div>
  );
};

export default Cal;