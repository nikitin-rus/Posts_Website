import { z } from "zod";

export const PostFormSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type PostFormDto = z.infer<typeof PostFormSchema>;