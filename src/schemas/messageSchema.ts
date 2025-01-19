import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .min(8, "Message must be 8 letters")
    .max(200, "Message must be atmost 200 characters"),
});
