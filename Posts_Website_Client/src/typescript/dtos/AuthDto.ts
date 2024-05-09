import { UserDto } from "./UserDto"

export interface AuthDto {
    isSuccessful: boolean,
    jwtToken: string | null,
    message: string | null,
    user: UserDto | null
}

export interface LoginDto {
    email: string,
    password: string
}

export interface RegisterDto {
    userName: string,
    email: string,
    password: string
}