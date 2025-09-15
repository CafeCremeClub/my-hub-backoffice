import axiosInstance from "@/config/axiosInstance";
import {SignInPayload} from "@/types/auth/SignInPayload";
import {SendOTPPayload} from "@/types/auth/SendOTPPayload";
import {SignInResponse} from "@/types/auth/SignInResponse";
import {Profile} from "@/types/auth/Profile";

export const sendOTP = async (payload: SendOTPPayload): Promise<void> => {
    try {
        await axiosInstance.post<void>("/users/otp", payload);
    } catch (error) {
        throw error;
    }
}

export const signIn = async (payload: SignInPayload): Promise<SignInResponse> => {
    try {
        const response = await axiosInstance.post<SignInResponse>("/users/signin", payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMe = async (): Promise<Profile> => {
    try {
        const response = await axiosInstance.get<Profile>("/profiles/me");
        return response.data
    } catch (error) {
        throw error;
    }
}