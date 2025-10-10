import { useMutation } from '@tanstack/react-query';
import { deleteMission } from '@/services/missionService';

const useDeleteMission = () => {
  return useMutation({
    mutationKey: ['delete-mission'],
    mutationFn: async (id: string) => await deleteMission(id),
    retry: 0,
  });
};

export default useDeleteMission;
