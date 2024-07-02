import axios from "axios";
import { CommentFormDto } from "../typescript/dtos/CommentDto";
import { PostFormDto } from "../typescript/dtos/PostDto";
import { LoginDto, RegisterDto } from "../typescript/dtos/AuthDto";

axios.defaults.baseURL = "http://localhost:8080";

// TODO: Валидация корректности id (GUID)
// TODO: Валидация корректности результата запроса (yup)

export class ApiWorker {

    // UserDto
    static async getUser(id: string): Promise<any> {
        return (await axios.get<any>(`/api/users/${id}`)).data;
    }

    // PostDto
    static async getPosts(): Promise<any> {
        return (await axios.get<any>(
            `/api/posts`
        )).data;
    }

    // PostDetailsDto
    static async getPost(id: string): Promise<any> {
        return (await axios.get<any>(`/api/posts/${id}`)).data;
    }

    // CommentDetailsDto
    static async getComment(
        postId: string,
        commentId: string
    ): Promise<any> {
        return (await axios.get<any>(
            `/api/posts/${postId}/comments/${commentId}`
        )).data;
    }

    static async createPost(
        postForm: PostFormDto,
        jwtToken: string
    ): Promise<any> {
        return (await axios.post(`/api/posts`, postForm, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })).data;
    }

    static async createComment(
        postId: string,
        commentForm: CommentFormDto,
        jwtToken: string
    ): Promise<any> {
        return (await axios.post<any>(
            `/api/posts/${postId}/comments`,
            commentForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )).data;
    }

    static async deletePost(
        id: string,
        jwtToken: string
    ): Promise<any> {
        return (await axios.delete<any>(`/api/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })).data;
    }

    static async deleteComment(
        postId: string,
        commentId: string,
        jwtToken: string
    ): Promise<any> {
        (await axios.delete<any>(
            `/api/posts/${postId}/comments/${commentId}`,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )).data;
    }

    static async updateComment(
        postId: string,
        commentId: string,
        commentForm: CommentFormDto,
        jwtToken: string
    ): Promise<any> {
        return (await axios.put<any>(
            `/api/posts/${postId}/comments/${commentId}`,
            commentForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )).data;
    }

    static async updatePost(
        id: string,
        postForm: PostFormDto,
        jwtToken: string
    ): Promise<any> {
        return (await axios.put<any>(
            `/api/posts/${id}`,
            postForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )).data;
    }

    static async login(login: LoginDto): Promise<any> {
        return (await axios.post<any>(
            "/auth/login",
            login
        )).data;
    }

    static async register(register: RegisterDto): Promise<any> {
        return (await axios.post<any>(
            "/auth/register",
            register
        )).data;
    }
}