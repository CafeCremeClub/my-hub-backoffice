import { useQuery } from '@tanstack/react-query';
import { GetWhiteListParams } from '@/types/white-list/GetWhiteListParams';
import { getWhiteList } from '@/services/whiteListService';

const DEFAULT_PAGE = 1;
export const GET_WHITE_LIST_DEFAULT_PER_PAGE = 10;

const useGetWhiteList = (params?: GetWhiteListParams) => {
  const mergedParams: GetWhiteListParams = {
    page: params?.page ?? DEFAULT_PAGE,
    perPage: params?.perPage ?? GET_WHITE_LIST_DEFAULT_PER_PAGE,
  };

  return useQuery({
    queryKey: ['get-white-list', mergedParams.page, mergedParams.perPage],
    queryFn: async () => await getWhiteList(mergedParams),
    retry: 0,
    refetchOnMount: false,
    refetchInterval: false,
  });
};

export default useGetWhiteList;
