import { formatDistanceToNow } from "date-fns";

export const getFormatDistanceToNow = (date: any) => {
  const fromNow = formatDistanceToNow(date);

  return `${fromNow} ago`;
};
