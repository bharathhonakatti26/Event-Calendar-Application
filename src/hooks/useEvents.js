import { useState, useEffect } from "react";

const useEvents = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  useEffect(() => {
    if (Object.keys(events).length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (date, event) => {
    setEvents((prevEvents) => {
      const dayEvents = prevEvents[date] || [];
      return {
        ...prevEvents,
        [date]: [...dayEvents, event],
      };
    });
  };

  const editEvent = (date, index, updatedEvent) => {
    setEvents((prevEvents) => {
      const dayEvents = [...(prevEvents[date] || [])];
      dayEvents[index] = updatedEvent;
      return {
        ...prevEvents,
        [date]: dayEvents,
      };
    });
  };

  const deleteEvent = (date, index) => {
    setEvents((prevEvents) => {
      const dayEvents = [...(prevEvents[date] || [])];
      dayEvents.splice(index, 1);
      return {
        ...prevEvents,
        [date]: dayEvents,
      };
    });
  };

  const getEventsForDate = (date) => {
    return events[date] || [];
  };

  return {
    events,
    addEvent,
    editEvent,
    deleteEvent,
    getEventsForDate,
  };
};

export default useEvents;
