import { z } from "zod";
import { requiredString } from "../utils";

export const registerSchema = z.object({
  email: z.string().email(),
  displayName: requiredString("displayName"),
  password: requiredString("password"),
});

export type TRegister = z.infer<typeof registerSchema>;
