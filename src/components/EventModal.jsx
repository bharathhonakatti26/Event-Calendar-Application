import React, { useState } from "react";
import { validateEvent, isEventValid } from "../utils/validation";
import "./EventModal.css";

const EventModal = ({ isOpen, onClose, onSave, initialEventData }) => {
  const [eventName, setEventName] = useState(initialEventData?.name || "");
  const [startTime, setStartTime] = useState(initialEventData?.startTime || "07:30");
  const [endTime, setEndTime] = useState(initialEventData?.endTime || "08:30");
  const [description, setDescription] = useState(initialEventData?.description || "");
  const [errors, setErrors] = useState({});

  const handleSave = () => {

    const eventData = {
      name: eventName.trim(),
      startTime,
      endTime,
      description: description.trim(),
    };

    const validationErrors = validateEvent(eventData);
    if (new Date(`1970-01-01T${endTime}`) <= new Date(`1970-01-01T${startTime}`)) {
      validationErrors.endTime = "End time must be after start time.";
    }

    if (!isEventValid(validationErrors)) {
      setErrors(validationErrors);
      console.log("Validation errors:", validationErrors);
      return;
    }

    try {
      onSave(eventData);
      console.log("Event saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialEventData ? "Edit Event" : "Add Event"}</h2>

        <div className="form-group">
          <label>Event Name *</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={errors.name ? "input-error" : ""}
            aria-label="Event Name"
            autoFocus
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Start Time *</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={errors.startTime ? "input-error" : ""}
            aria-label="Start Time"
          />
          {errors.startTime && <span className="error-message">{errors.startTime}</span>}
        </div>

        <div className="form-group">
          <label>End Time *</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={errors.endTime ? "input-error" : ""}
            aria-label="End Time"
          />
          {errors.endTime && <span className="error-message">{errors.endTime}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a brief description of the event"
            aria-label="Description"
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button" aria-label="Cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="save-button" aria-label="Save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
