import { z } from "zod";

import { UserSchema } from "./UserSchema";
import { PostSchema } from "../post/PostSchema";
import { CommentSchema } from "../comment/Comment";

export const UserDetailsSchema = UserSchema.extend({
    posts: PostSchema.array(),
    comments: CommentSchema.array(),
});

export type UserDetailsDto = z.infer<typeof UserDetailsSchema>;