import { format } from "date-fns";

export const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return format(date, "EEE, MMMMMMMMMMMMM dd yyyy");
};
