import {
  addDays,
  format,
  getMonth,
  lastDayOfMonth,
  lastDayOfWeek,
  sub,
} from "date-fns";

const STANDARD_FORMAT = "yyyy-MM-dd";

export const getCurrentDate = () => {
  const currentDate = new Date();
  return format(currentDate, STANDARD_FORMAT);
};

export const getCurrentDatePlusOneDay = () => {
  const currentDate = new Date();
  const currentDatePlusOneDay = addDays(currentDate, 1);
  return format(currentDatePlusOneDay, STANDARD_FORMAT);
};

export const getCurrentWeek = () => {
  const currentDate = new Date();
  const saturday = lastDayOfWeek(currentDate);
  const sunday = sub(saturday, { days: 6 });
  return {
    start: format(sunday, STANDARD_FORMAT),
    end: format(saturday, STANDARD_FORMAT),
  };
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  return {
    start: format(start, STANDARD_FORMAT),
    end: format(end, STANDARD_FORMAT),
  };
};
