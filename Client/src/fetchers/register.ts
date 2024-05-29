import axios from "axios";
import { AuthDto, RegisterDto } from "../typescript/dtos/AuthDto";

export async function register(register: RegisterDto) {
    const response = await axios.post<AuthDto>(
        "/auth/register",
        register
    );
    return response.data;
}