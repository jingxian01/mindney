import {
  addDays,
  differenceInMinutes,
  format,
  fromUnixTime,
  lastDayOfWeek,
  sub,
} from "date-fns";

export interface DateRange {
  start: string;
  end: string;
}

const STANDARD_FORMAT_WITH_TIME = "yyyy-MM-dd kk:mm";
const STANDARD_FORMAT = "yyyy-MM-dd";

export const getDateFromUnix = (unixString: string) => {
  const date = fromUnixTime(parseInt(unixString) / 1000);

  const diffInMinutes = differenceInMinutes(new Date(), date);
  if (diffInMinutes > 60) {
    if (diffInMinutes > 24 * 60) {
      return format(date, STANDARD_FORMAT_WITH_TIME);
    }
    return Math.round(diffInMinutes / 60) + "h ago";
  }
  return Math.round(diffInMinutes) + "m ago";
};

export const getRange = (currentTab: string): DateRange => {
  switch (currentTab) {
    case "Date":
      return getCurrentDayRange();

    case "Week":
      return getCurrentWeekRange();

    case "Month":
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
    0
  );
  return {
    start: format(start, STANDARD_FORMAT),
    end: format(end, STANDARD_FORMAT),
  };
};
