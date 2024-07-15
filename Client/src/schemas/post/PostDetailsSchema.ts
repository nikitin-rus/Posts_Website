import { z } from "zod";
import { PostSchema } from "./PostSchema";
import { CommentSchema } from "../comment/Comment";

export const PostDetailsSchema = PostSchema.extend({
    comments: CommentSchema.array(),
});

export type PostDetailsDto = z.infer<typeof PostDetailsSchema>;