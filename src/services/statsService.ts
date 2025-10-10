import { KpiStats } from '@/types/stats/KpiStats';
import axiosInstance from '@/config/axiosInstance';

export const getKpiStats = async (): Promise<KpiStats> => {
  try {
    const response = await axiosInstance.get<KpiStats>('/missions/admin/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};
