import { differenceInMinutes, format, fromUnixTime } from "date-fns";

const STANDARD_FORMAT = "yyyy-MM-dd kk:mm";

export const getDateFromUnix = (unixString: string) => {
  const date = fromUnixTime(parseInt(unixString) / 1000);

  const diffInMinutes = differenceInMinutes(new Date(), date);
  if (diffInMinutes > 60) {
    if (diffInMinutes > 24 * 60) {
      return format(date, STANDARD_FORMAT);
    }
    return Math.round(diffInMinutes / 60) + "h ago";
  }
  return Math.round(diffInMinutes) + "m ago";
};
