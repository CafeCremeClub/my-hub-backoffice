import {MissionStatus} from "@/types/mission/MissionStatus";


export interface UpdateMissionStatusPayload {
    id: string;
    status: MissionStatus;
}