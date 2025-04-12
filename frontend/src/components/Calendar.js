// Calendar.js
import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting with Team",
      start: new Date(),
      end: new Date(),
    },
  ]);

  // Handle clicking on a date
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  // Optional: handle clicking on an existing event
  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <div style={calendarContainerStyle}>
      <h2 style={{ marginBottom: "20px" }}>📅 Your Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={calendarStyle}
      />
    </div>
  );
};

const calendarContainerStyle = {
  padding: "20px",
  backgroundColor: "#f4f4f4",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const calendarStyle = {
  height: "80vh",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "10px",
};

export default MyCalendar;
