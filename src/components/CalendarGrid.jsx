import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import "./CalendarGrid.css";

const Calendar = ({ selectedDate, onDayClick = () => {}, events = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  const daysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startWeek = startOfWeek(start);
    const endWeek = endOfWeek(end);
    return eachDayOfInterval({ start: startWeek, end: endWeek });
  };

  const handlePreviousMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const formatDate = (date) => format(date, "yyyy-MM-dd")

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <FaAngleDoubleLeft onClick={handlePreviousMonth} className="calendarshiftbuttons" />
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <FaAngleDoubleRight onClick={handleNextMonth} className="calendarshiftbuttons" />
      </div>

      <div className="calendar-grid calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid calendar-days">
        {daysInMonth().map((day) => {
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const formattedDate = formatDate(day);
          const dayEvents = events[formattedDate] || [];
          const isSelected = selectedDate && isSameDay(selectedDate, day);

          return (
            <div
              key={formattedDate}
              className={`calendar-day ${isCurrentDay ? "current-day" : ""} ${
                isCurrentMonth ? "current-month" : "other-month"
              } ${isSelected ? "selected-day" : ""}`}
              onClick={() => onDayClick(day)}
            >
              <div className="day-number">{format(day, "d")}</div>

              {dayEvents.length > 0 && (
                <div className="event-badge">{dayEvents.length}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;