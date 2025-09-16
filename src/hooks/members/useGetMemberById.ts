import {useQuery} from "@tanstack/react-query";
import {getMemberById} from "@/services/membersService";

const useGetMemberById = (id: string) => {

    return useQuery({
        queryKey: ["get-member-by-id", id],
        queryFn: async () => await getMemberById(id),
        enabled: !!id,
        retry: 0,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetMemberById;