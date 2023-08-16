export interface IUser {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    theme: string | "Primary" | "Dark" | "Neutral";
    language: string;
    image: string;
}
