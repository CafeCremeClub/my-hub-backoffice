import {useQuery} from "@tanstack/react-query";
import {getKpiStats} from "@/services/statsService";

const useGetKpiStats = () => {

    return useQuery({
        queryKey: ["get-kpi-stats"],
        queryFn: getKpiStats,
        retry: 0,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetKpiStats;