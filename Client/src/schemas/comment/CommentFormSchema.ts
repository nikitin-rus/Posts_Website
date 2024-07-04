import { z } from "zod";

export const CommentFormSchema = z.object({
    content: z.string()
});

export type CommentFormDto = z.infer<typeof CommentFormSchema>;