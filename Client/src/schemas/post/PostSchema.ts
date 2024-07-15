import { z } from "zod";
import { UserSchema } from "../user/UserSchema";

export const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    publishedAt: z.string(),
    user: UserSchema,
});

export type PostDto = z.infer<typeof PostSchema>;