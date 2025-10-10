import { GetWhiteListParams } from '@/types/white-list/GetWhiteListParams';
import { GetWhiteListResponse } from '@/types/white-list/GetWhiteListResponse';
import axiosInstance from '@/config/axiosInstance';

export const getWhiteList = async (
  params?: GetWhiteListParams
): Promise<GetWhiteListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.perPage)
        queryParams.append('perPage', params.perPage.toString());
    }

    const url =
      `/whitelists` +
      (queryParams.toString() ? `?${queryParams.toString()}` : '');
    const response = await axiosInstance.get<GetWhiteListResponse>(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUserToWhiteList = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post<void>('/whitelists', {
      email: email,
    });
  } catch (error) {
    throw error;
  }
};
