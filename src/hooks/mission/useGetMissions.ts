import { useQuery } from '@tanstack/react-query';
import { GetMissionsParams } from '@/types/mission/GetMissionsParams';
import { getMissions } from '@/services/missionService';

const DEFAULT_PAGE = 1;
export const GET_MISSIONS_DEFAULT_PER_PAGE = 10;

const useGetMissions = (params?: GetMissionsParams) => {
  const mergedParams: GetMissionsParams = {
    page: params?.page ?? DEFAULT_PAGE,
    perPage: params?.perPage ?? GET_MISSIONS_DEFAULT_PER_PAGE,
    search: params?.search ?? undefined,
  };

  return useQuery({
    queryKey: [
      'get-missions',
      mergedParams.page,
      mergedParams.perPage,
      mergedParams.search,
    ],
    queryFn: async () => await getMissions(mergedParams),
    retry: 0,
    refetchOnMount: false,
    refetchInterval: false,
    // Disable caching when there's a search query to ensure fresh data
    staleTime: mergedParams.search ? 0 : 5 * 60 * 1000, // 0 for search, 5 minutes for normal queries
    gcTime: mergedParams.search ? 0 : 5 * 60 * 1000, // Immediately garbage collect search results
  });
};

export default useGetMissions;
