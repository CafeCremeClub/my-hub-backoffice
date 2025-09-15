import {GetMissionsResponse} from "@/types/mission/GetMissionsResponse";
import {GetMissionsParams} from "@/types/mission/GetMissionsParams";
import axiosInstance from "@/config/axiosInstance";


export const getMissions = async (params?: GetMissionsParams): Promise<GetMissionsResponse> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
        if (params?.search) queryParams.append('search', params.search);

        const url = `/missions/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axiosInstance.get<GetMissionsResponse>(url);
        return response.data
    } catch (error) {
        throw error;
    }
}