import {User} from "@/types/auth/User";


export interface SignInResponse {
    user: User;
    info: boolean; // Check if the profile info is completed
    profile: boolean; // Check if the profile is completed
    accessToken: string;
}