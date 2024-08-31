import { z } from "zod";
import { UserSchema } from "../user/UserSchema";

export const CommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    content: z.string(),
    writtenAt: z.string(),
    user: UserSchema
});

export type CommentDto = z.infer<typeof CommentSchema>;