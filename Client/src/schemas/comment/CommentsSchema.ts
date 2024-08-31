import { z } from "zod";
import { CommentSchema } from "./CommentSchema";

export const CommentsSchema = z.object({
    comments: CommentSchema.array(),
    totalCount: z.number(), 
});

export type CommentsDto = z.infer<typeof CommentsSchema>;