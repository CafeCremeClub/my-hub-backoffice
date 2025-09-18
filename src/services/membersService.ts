import {GetMembersParams} from "@/types/members/GetMembersParams";
import {GetMembersResponse} from "@/types/members/GetMembersResponse";
import axiosInstance from "@/config/axiosInstance";
import {Member} from "@/types/members/Member";


export const getAllMembers = async (params?: GetMembersParams): Promise<GetMembersResponse> => {
    try {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
        if (params?.orderBy) queryParams.append('orderBy', params.orderBy.toString());
        if (params?.direction) queryParams.append('direction', params.direction.toString());

        const url = `/profiles/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axiosInstance.get<GetMembersResponse>(url);
        return response.data

    } catch (error) {
        throw error;
    }
}

export const getMemberById = async (id: string): Promise<Member> => {
    try {
        const response = await axiosInstance.get<Member>(`/profiles/admin/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}