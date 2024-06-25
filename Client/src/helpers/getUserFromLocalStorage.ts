import { UserDto } from "../typescript/dtos/UserDto";

// TODO: Упростить валидацию (library yup)
function isUserDto(obj: any): obj is UserDto {
    return typeof obj === "object"
        && obj !== null
        && obj["id"] !== undefined
        && obj["userName"] !== undefined
        && obj["email"] !== undefined;
}

export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');

    if (!user) return null;

    try {
        const parsedUser = JSON.parse(user);
        return isUserDto(parsedUser) ? parsedUser : null;
    } catch (e) {
        if (e instanceof SyntaxError) {
            return null;
        } else {
            throw e;
        }
    }
}