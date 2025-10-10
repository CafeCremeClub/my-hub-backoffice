import { GetApplicationsByMissionIdParams } from '@/types/applications/GetApplicationsByMissionIdParams';
import { GetApplicationsByMissionIdResponse } from '@/types/applications/GetApplicationsByMissionIdResponse';
import axiosInstance from '@/config/axiosInstance';

export const getApplicationsByMissionId = async (
  id: string,
  params?: GetApplicationsByMissionIdParams
): Promise<GetApplicationsByMissionIdResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.perPage)
        queryParams.append('perPage', params.perPage.toString());
    }

    const url =
      `/applications/missions/${id}` +
      (queryParams.toString() ? `?${queryParams.toString()}` : '');
    const response =
      await axiosInstance.get<GetApplicationsByMissionIdResponse>(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
