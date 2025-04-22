// Calendar.js
import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
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
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [events, setEvents] = useState([]);

  // ✅ Load events from localStorage and convert date strings to Date objects
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents).map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(parsedEvents);
    }
  }, []);

  // ✅ Save events to localStorage when they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleSelectEvent = (eventToEdit) => {
    const action = window.prompt(
      `Edit the title or type DELETE to remove the event:`,
      eventToEdit.title
    );
    if (action === null) return; // Cancelled
    if (action.toUpperCase() === "DELETE") {
      setEvents(events.filter((e) => e !== eventToEdit));
    } else {
      setEvents(
        events.map((e) =>
          e === eventToEdit ? { ...e, title: action } : e
        )
      );
    }
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
        date={date}
        view={view}
        onView={(v) => setView(v)}
        onNavigate={(date) => setDate(new Date(date))}
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
