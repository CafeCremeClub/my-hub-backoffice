import {GetMembersParams} from "@/types/members/GetMembersParams";
import {GetMembersResponse} from "@/types/members/GetMembersResponse";
import axiosInstance from "@/config/axiosInstance";


export const getAllMembers = async (params?: GetMembersParams): Promise<GetMembersResponse> => {
    try {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.perPage) queryParams.append('perPage', params.perPage.toString());

        const url = `/profiles/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axiosInstance.get<GetMembersResponse>(url);
        return response.data

    } catch (error) {
        throw error;
    }
}