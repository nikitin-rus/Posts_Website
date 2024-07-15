import { z } from "zod";
import { PostSchema } from "./PostSchema";

export const PostsSchema = z.object({
    posts: PostSchema.array(),
    totalCount: z.number(), 
});

export type PostsDto = z.infer<typeof PostsSchema>;