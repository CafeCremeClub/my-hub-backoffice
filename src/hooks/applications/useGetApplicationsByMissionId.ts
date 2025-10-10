import { useQuery } from '@tanstack/react-query';
import { GetApplicationsByMissionIdParams } from '@/types/applications/GetApplicationsByMissionIdParams';
import { getApplicationsByMissionId } from '@/services/applicationsService';

const DEFAULT_PAGE = 1;
export const GET_APPLICATIONS_BY_MISSION_ID_DEFAULT_PER_PAGE = 10;

const useGetApplicationsByMissionId = (
  id: string,
  params?: GetApplicationsByMissionIdParams
) => {
  const mergedParams: GetApplicationsByMissionIdParams = {
    page: params?.page ?? DEFAULT_PAGE,
    perPage: params?.perPage ?? GET_APPLICATIONS_BY_MISSION_ID_DEFAULT_PER_PAGE,
  };

  return useQuery({
    queryKey: [
      'get-applications-by-mission-id',
      id,
      mergedParams.page,
      mergedParams.perPage,
    ],
    queryFn: async () => await getApplicationsByMissionId(id, mergedParams),
    retry: 0,
    refetchOnMount: false,
    refetchInterval: false,
  });
};

export default useGetApplicationsByMissionId;
