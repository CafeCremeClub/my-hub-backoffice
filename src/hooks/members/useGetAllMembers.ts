import {useQuery} from "@tanstack/react-query";
import {GetMembersParams} from "@/types/members/GetMembersParams";
import {getAllMembers} from "@/services/membersService";

const DEFAULT_PAGE = 1;
export const GET_ALL_PROFILES_DEFAULT_PER_PAGE = 10;

const useGetAllMembers = (params?: GetMembersParams) => {

    const mergedParams: GetMembersParams = {
        page: params?.page ?? DEFAULT_PAGE,
        perPage: params?.perPage ?? GET_ALL_PROFILES_DEFAULT_PER_PAGE,
    }

    return useQuery({
        queryKey: ["get-all-members", mergedParams.page, mergedParams.perPage],
        queryFn: async () => await getAllMembers(mergedParams),
        retry: 0,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetAllMembers;