import { z } from "zod";

export const PostRouteParamsSchema = z.object({
    id: z.string()
});

export type PostRouteParamsDto = z.infer<typeof PostRouteParamsSchema>;