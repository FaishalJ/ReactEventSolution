import { type DateArg, format } from "date-fns";

export const viteEnv = {
  url: import.meta.env.VITE_API_URL!,
};

export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy h:mm a");
}
