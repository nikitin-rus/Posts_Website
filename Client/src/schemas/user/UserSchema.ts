import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    userName: z.string(),
    email: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;
