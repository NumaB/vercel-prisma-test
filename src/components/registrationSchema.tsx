import { z } from "zod";

// Schema de notre formulaire
export const schema = z.object({
  fullName: z.string().trim().min(2, {
    message: "Veuillez renseigner votre nom complet",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  pseudonyme: z.string().trim().min(2, {
    message: "Invalid pseudonyme",
  }),
});

export const chicagoSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Veuillez renseigner le chica-nom",
  }),
});
