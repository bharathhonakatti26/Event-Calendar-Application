export const validateEvent = ({ name, startTime, endTime }) => {
  const errors = {};

  if (!name || name.trim().length === 0) {
      errors.name = "Event name is required.";
  }

  if (!startTime || !/^\d{1,2}:\d{2}$/.test(startTime)) {
      errors.startTime = "Invalid start time. Use hh:mm format.";
  }

  if (!endTime || !/^\d{1,2}:\d{2}$/.test(endTime)) {
      errors.endTime = "Invalid end time. Use hh:mm format.";
  }

  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  if (start >= end) {
      errors.timeOrder = "End time must be after start time.";
  }

  return errors;
};

export const isEventValid = (errors) => Object.keys(errors).length === 0;
