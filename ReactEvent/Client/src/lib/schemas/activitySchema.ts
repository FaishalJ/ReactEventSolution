import { z } from "zod";
// import { requiredString } from "../util/util";
const requiredString = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.coerce.date({ message: " Date is required" }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});

export type TActivitySchema = z.infer<typeof activitySchema>;
