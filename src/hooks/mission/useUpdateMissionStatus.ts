import { useMutation } from '@tanstack/react-query';
import { UpdateMissionStatusPayload } from '@/types/mission/UpdateMissionStatusPayload';
import { updateMissionStatus } from '@/services/missionService';

const useUpdateMissionStatus = () => {
  return useMutation({
    mutationKey: ['update-mission-status'],
    mutationFn: async (payload: UpdateMissionStatusPayload) =>
      await updateMissionStatus(payload),
    retry: 0,
  });
};

export default useUpdateMissionStatus;
