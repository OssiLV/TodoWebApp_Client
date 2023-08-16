import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./../Global";

const initialUser: IUser = {
    id: "",
    userName: "",
    email: "",
    emailConfirmed: false,
    language: "",
    theme: "",
    image: "",
};

export const UserReducer = createSlice({
    name: "UserReducer",
    initialState: initialUser,
    reducers: {
        setLogin: (state: IUser, action: PayloadAction<IUser>) => {
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.emailConfirmed = action.payload.emailConfirmed;
            state.theme = action.payload.theme;
            state.language = action.payload.language;
            state.image = action.payload.image;
        },
        setLogout: (state: IUser) => {
            state.id = "";
            state.userName = "";
            state.email = "";
            state.emailConfirmed = false;
            state.theme = "";
            state.language = "";
            state.image = "";
        },
        setEmail: (state: IUser, action) => {
            state.email = action.payload.email;
        },
        setTheme: (state: IUser, action) => {
            state.theme = action.payload.theme;
        },
        setLanguage: (state: IUser, action) => {
            state.language = action.payload.language;
        },
        setAvatar: (state: IUser, action) => {
            state.image = action.payload.image;
        },
        setUserName: (state: IUser, action) => {
            state.userName = action.payload.userName;
        },
    },
});

export const {
    setLogin,
    setLogout,
    setEmail,
    setTheme,
    setLanguage,
    setAvatar,
    setUserName,
} = UserReducer.actions;
export default UserReducer.reducer;
