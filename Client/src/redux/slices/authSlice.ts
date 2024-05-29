import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../../typescript/dtos/UserDto";

interface AuthState {
    jwtToken: string | null
    user: UserDto | null
}

const initialState: AuthState = {
    jwtToken: null,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        "login": (state, action: PayloadAction<AuthState>) => {
            state.jwtToken = action.payload.jwtToken;
            state.user = action.payload.user;
        },
        "logout": (state) => {
            state.jwtToken = null;
            state.user = null;
        }
    }
});

const authSelector = (state: AuthState) => state;

export default authSlice;

export const { login, logout } = authSlice.actions;

export { authSelector };