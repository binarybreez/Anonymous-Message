import { z } from "zod";

export const verifySchema = z.object({
  verificationCode: z
    .string()
    .min(6, "verification code length should be 6 characters"),
});
