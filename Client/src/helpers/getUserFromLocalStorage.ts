import { ZodError } from "zod";
import { UserSchema } from "../schemas/user/UserSchema";

export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');

    if (!user) return null;

    try {
        const parsedUser = JSON.parse(user);
        return UserSchema.parse(parsedUser);
    } catch (e) {
        if (
            e instanceof SyntaxError
            || e instanceof ZodError
        ) {
            return null;
        } else {
            throw e;
        }
    }
}