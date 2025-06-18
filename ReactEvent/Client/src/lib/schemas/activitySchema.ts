import { z } from "zod";
// import { requiredString } from "../util/util";
const requiredString = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: requiredString("Date"),
  city: requiredString("City"),
  venue: requiredString("Venue"),
});

export type TActivitySchema = z.infer<typeof activitySchema>;
