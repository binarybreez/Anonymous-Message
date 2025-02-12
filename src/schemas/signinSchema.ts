import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, "password length must be 8 characters"),
});
