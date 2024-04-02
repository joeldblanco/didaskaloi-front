export const validateStudent = (values) => {
  let errors = {};

  const { firstName, lastName, age, gender } = values;
  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!age) errors.age = "Age is required";
  if (!gender) errors.gender = "Gender is required";

  if (typeof firstName !== "string")
    errors.firstName = "First name must be a string";
  if (typeof lastName !== "string")
    errors.firstName = "Last name must be a string";

  if (typeof age !== "number") errors.age = "Age must be a number";

  if (age < 0 || age > 120) errors.age = "Invalid age";

  const validGenders = ["male", "female"];
  if (!validGenders.includes(gender)) errors.gender = "Invalid gender";

  return errors;
};

export const validateClass = (values) => {
  let errors = {};

  const { name, day, time } = values;
  if (!name) errors.name = "Name is required";
  if (!day) errors.day = "Day is required";
  if (!time) errors.time = "Time is required";

  if (typeof name !== "string") errors.name = "Name must be a string";
  if (typeof day !== "string") errors.day = "Day must be a string";
  if (typeof time !== "string") errors.time = "Time must be a string";

  const validDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (!validDays.includes(day)) errors.day = "Invalid day";

  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) errors.time = "Invalid time";

  return errors;
};

export const validateRecord = (values) => {
  let errors = {};

  const { date } = values;
  if (!date) errors.date = "Date is required";

  if (typeof date !== "string") errors.date = "Date must be a string";

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) errors.date = "Invalid date";

  return errors;
};
