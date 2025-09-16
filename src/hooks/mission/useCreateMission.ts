import {useMutation} from "@tanstack/react-query";
import {CreateMissionPayload} from "@/types/mission/CreateMissionPayload";
import {createMission} from "@/services/missionService";

const useCreateMission = () => {

    return useMutation({
        mutationKey: ["create-mission"],
        mutationFn: async (payload: CreateMissionPayload) => await createMission(payload),
        retry: 0
    })

}

export default useCreateMission;