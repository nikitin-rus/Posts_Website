import { z } from "zod";
import { CommentSchema } from "./CommentSchema";
import { PostSchema } from "../post/PostSchema";

export const CommentDetailsSchema = CommentSchema.extend({
    post: PostSchema
});

export type CommentDetailsDto = z.infer<typeof CommentDetailsSchema>;