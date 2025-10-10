import { GetMissionsResponse } from '@/types/mission/GetMissionsResponse';
import { GetMissionsParams } from '@/types/mission/GetMissionsParams';
import axiosInstance from '@/config/axiosInstance';
import { UpdateMissionStatusPayload } from '@/types/mission/UpdateMissionStatusPayload';
import { CreateMissionPayload } from '@/types/mission/CreateMissionPayload';

export const getMissions = async (
  params?: GetMissionsParams
): Promise<GetMissionsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.perPage)
      queryParams.append('perPage', params.perPage.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/missions/admin${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    const response = await axiosInstance.get<GetMissionsResponse>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMission = async (
  payload: CreateMissionPayload
): Promise<void> => {
  try {
    await axiosInstance.post<void>('/missions', payload);
  } catch (error) {
    throw error;
  }
};

export const updateMissionStatus = async (
  payload: UpdateMissionStatusPayload
): Promise<void> => {
  try {
    await axiosInstance.patch<void>(`/missions/update/${payload.id}`, {
      status: payload.status,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMission = async (missionId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/missions/${missionId}`);
  } catch (error) {
    throw error;
  }
};
