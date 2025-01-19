import { z } from "zod";

export const usernameValidate = z
  .string()
  .min(3, "username length must be atleast 3 characters")
  .max(20, "username length must be atmost 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username must only contain alphanumeric values");

export const signupSchema = z.object({
  username: usernameValidate,
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, "password length must be 8 characters"),
});
