import { z } from "zod";
import { LoginFormSchema } from "./LoginFormSchema";

export const RegisterFormSchema = LoginFormSchema.extend({
    userName: z.string(),
});

export type RegisterFormDto = z.infer<typeof RegisterFormSchema>;