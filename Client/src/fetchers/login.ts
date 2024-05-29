import axios from "axios";
import { AuthDto, LoginDto } from "../typescript/dtos/AuthDto";

export async function login(login: LoginDto) {
    const response = await axios.post<AuthDto>(
        "/auth/login", 
        login
    );
    return response.data;
}