import axios from "axios";
import { UserDetailsDto } from "../typescript/dtos/UserDto";

export async function getUser(id: string) {
    const response = await axios.get<UserDetailsDto>(`/api/users/${id}`);
    return response.data;
}