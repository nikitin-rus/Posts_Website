import { z } from "zod";
import { UserSchema } from "../user/UserSchema";

export const AuthSchema = z.object({
    isSuccessful: z.boolean(),
    jwtToken: z.union([z.string(), z.null()]),
    message: z.union([z.string(), z.null()]),
    user: z.union([UserSchema, z.null()]),
});

export type AuthDto = z.infer<typeof AuthSchema>;

