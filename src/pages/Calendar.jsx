import React, { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";
import EventModal from "../components/EventModal";
import EventList from "../components/EventList";
import useEvents from "../hooks/useEvents";
import { format } from 'date-fns';
import { IoAddCircleOutline } from "react-icons/io5"
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { events, addEvent, editEvent, deleteEvent } = useEvents();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getFormattedDate = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const resetTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const handleDayClick = (day = new Date()) => {
    setSelectedDate(resetTime(day));
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleEditEvent = (index) => {
    const dateKey = getFormattedDate(selectedDate);
    const eventToEdit = events[dateKey][index];
    setEditingEvent({ ...eventToEdit, index });
    setModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    const dateKey = getFormattedDate(selectedDate);
    if (editingEvent) {
      editEvent(dateKey, editingEvent.index, event);
    } else {
      addEvent(dateKey, event);
    }
    setModalOpen(false);
  };

  const handleDeleteEvent = (index) => {
    const dateKey = getFormattedDate(selectedDate);
    deleteEvent(dateKey, index);
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setSelectedDate(resetTime(new Date(storedDate)));
    } else {
      setSelectedDate(resetTime(new Date()));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate.toISOString());
  }, [selectedDate]);

  const selectedDateEvents = events[getFormattedDate(selectedDate)] || [];

  return (
    <div className="calendar-container divtwowayflex backgroundcolour">
      <CalendarGrid
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
        events={events}
      />

      <div className="sidebar">
        <div className="flexeventbotton">
          <h3>Events on {selectedDate.toDateString()}</h3>
          <IoAddCircleOutline onClick={handleAddEvent} className="add-event-button" />
        </div>

        <EventList
          events={selectedDateEvents}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      </div>

      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
        initialEventData={editingEvent}
      />
    </div>
  );
};

export default Calendar;
