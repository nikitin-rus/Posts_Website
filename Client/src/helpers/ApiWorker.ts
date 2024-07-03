import axios from "axios";
import { UserSchema, UserDto } from "../schemas/user/UserSchema";
import { PostDto, PostSchema } from "../schemas/post/PostSchema";
import { PostDetailsDto, PostDetailsSchema } from "../schemas/post/PostDetailsSchema";
import { AuthDto, AuthSchema } from "../schemas/auth/AuthSchema";
import { LoginFormDto } from "../schemas/auth/LoginFormSchema";
import { RegisterFormDto } from "../schemas/auth/RegisterFormSchema";
import { CommentDto, CommentSchema } from "../schemas/comment/Comment";
import { CommentDetailsDto, CommentDetailsSchema } from "../schemas/comment/CommentDetailsSchema";
import { CommentFormDto } from "../schemas/comment/CommentFormSchema";
import { PostFormDto } from "../schemas/post/PostFormSchema";

axios.defaults.baseURL = "http://localhost:8080";

export class ApiWorker {
    static async getUser(id: string): Promise<UserDto> {
        const { data } = await axios.get(`/api/users/${id}`);
        return UserSchema.parse(data);
    }

    static async getPosts(): Promise<PostDto[]> {
        const { data } = await axios.get(
            `/api/posts`
        );

        return PostSchema.array().parse(data);
    }

    static async getPost(id: string): Promise<PostDetailsDto> {
        const { data } = await axios.get(`/api/posts/${id}`);
        return PostDetailsSchema.parse(data);
    }

    static async getComment(
        postId: string,
        commentId: string
    ): Promise<CommentDetailsDto> {
        const { data } = await axios.get(
            `/api/posts/${postId}/comments/${commentId}`
        );

        return CommentDetailsSchema.parse(data);
    }

    static async createPost(
        postForm: PostFormDto,
        jwtToken: string
    ): Promise<PostDto> {
        const { data } = await axios.post(`/api/posts`, postForm, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        return PostSchema.parse(data);
    }

    static async createComment(
        postId: string,
        commentForm: CommentFormDto,
        jwtToken: string
    ): Promise<CommentDto> {
        const { data } = await axios.post(
            `/api/posts/${postId}/comments`,
            commentForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        );

        return CommentSchema.parse(data);
    }

    static async deletePost(
        id: string,
        jwtToken: string
    ): Promise<PostDto> {
        const { data } = await axios.delete(`/api/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        return PostSchema.parse(data);
    }

    static async deleteComment(
        postId: string,
        commentId: string,
        jwtToken: string
    ): Promise<CommentDto> {
        const { data } = await axios.delete(
            `/api/posts/${postId}/comments/${commentId}`,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        );

        return CommentSchema.parse(data);
    }

    static async updateComment(
        postId: string,
        commentId: string,
        commentForm: CommentFormDto,
        jwtToken: string
    ): Promise<CommentDto> {
        const { data } = await axios.put(
            `/api/posts/${postId}/comments/${commentId}`,
            commentForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        );

        return CommentSchema.parse(data);
    }

    static async updatePost(
        id: string,
        postForm: PostFormDto,
        jwtToken: string
    ): Promise<PostDto> {
        const { data } = await axios.put(
            `/api/posts/${id}`,
            postForm,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        );

        return PostSchema.parse(data);
    }

    static async login(login: LoginFormDto): Promise<AuthDto> {
        const { data } = await axios.post(
            "/auth/login",
            login
        );

        return AuthSchema.parse(data);
    }

    static async register(register: RegisterFormDto): Promise<AuthDto> {
        const { data } = await axios.post(
            "/auth/register",
            register
        );

        return AuthSchema.parse(data);
    }
}