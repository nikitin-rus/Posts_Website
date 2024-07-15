import { z } from "zod";

export const CommentRouteParamsSchema = z.object({
    postId: z.string(),
    commentId: z.string(),
});

export type CommentRouteParamsDto = z.infer<typeof CommentRouteParamsSchema>;