import { z } from "zod";

export const UserRouteParamsSchema = z.object({
    id: z.string()
});

export type UserRouteParamsDto = z.infer<typeof UserRouteParamsSchema>;