import { addDays, format, lastDayOfWeek, sub } from "date-fns";
import { Range } from "src/spends/dto/order-by-range.input";

export interface DateRange {
  start: string;
  end: string;
}

const STANDARD_FORMAT = "yyyy-MM-dd";

export const getDateRange = (range: Range): DateRange => {
  switch (range) {
    case Range.DAY:
      return getCurrentDayRange();

    case Range.WEEK:
      return getCurrentWeekRange();

    case Range.MONTH:
      return getCurrentMonthRange();

    default:
      return getCurrentDayRange();
  }
};

export const getCurrentDayRange = (): DateRange => {
  const currentDay = new Date();
  const currentDayPlusOne = addDays(currentDay, 1);
  return {
    start: format(currentDay, STANDARD_FORMAT),
    end: format(currentDayPlusOne, STANDARD_FORMAT),
  };
};

const getCurrentWeekRange = (): DateRange => {
  const currentDate = new Date();
  const saturday = lastDayOfWeek(currentDate);
  const sunday = sub(saturday, { days: 6 });
  return {
    start: format(sunday, STANDARD_FORMAT),
    end: format(saturday, STANDARD_FORMAT),
  };
};

const getCurrentMonthRange = (): DateRange => {
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
