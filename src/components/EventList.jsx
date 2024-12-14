import React from "react";
import "./EventList.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const EventList = ({ events, onEdit, onDelete }) => {
  if (!events || events.length === 0) {
    console.log("No events for this day", events);
    return <div className="no-events">No events for this day.</div>;
  }

  return (
    <div className="event-list">
      <ul style={{paddingInlineStart:"0px"}}>
        {events.map((event, index) => (
          <li key={index} className="event-item">
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>
                {event.startTime} - {event.endTime}
              </p>
              {event.description && <p>{event.description}</p>}
            </div>

            <div className="event-actions">
              <CiEdit onClick={() => onEdit(index)} className="edit-button"/>
              <MdDeleteOutline onClick={() => onDelete(index)} className="edit-button"/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
