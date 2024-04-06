import { z } from "zod";

export const schema = z.object({
  fullName: z.string().trim().min(4, {
    message: "Veuillez renseigner votre nom complet",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});
