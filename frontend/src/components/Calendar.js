import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set default base URL for Axios
axios.defaults.baseURL = "http://127.0.0.1:5000";

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

const calendarContainerStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  marginLeft: "300px",
};

const calendarStyle = {
  height: "600px",
};

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/events?user_id=1") // Replace 1 with actual user ID when available
      .then((response) => {
        const fetchedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      const newEvent = { start, end, title, user_id: 1 }; // Replace 1 with actual user ID
      axios
        .post("/api/events", newEvent)
        .then((response) => {
          setEvents([...events, { ...newEvent, id: response.data.id }]);
        })
        .catch((error) => console.error("Error adding event:", error));
    }
  };

  const handleSelectEvent = (eventToEdit) => {
    const action = window.prompt(`Edit the title or type DELETE to remove the event:`, eventToEdit.title);
    if (action === null) return;
    if (action.toUpperCase() === "DELETE") {
      axios
        .delete(`/api/events/${eventToEdit.id}`)
        .then(() => {
          setEvents(events.filter((e) => e.id !== eventToEdit.id));
        })
        .catch((error) => console.error("Error deleting event:", error));
    } else {
      const updatedEvent = { ...eventToEdit, title: action };
      axios
        .put(`/api/events/${eventToEdit.id}`, updatedEvent)
        .then(() => {
          setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
        })
        .catch((error) => console.error("Error updating event:", error));
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

export default MyCalendar;
