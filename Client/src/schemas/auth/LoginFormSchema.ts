import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export type LoginFormDto = z.infer<typeof LoginFormSchema>;