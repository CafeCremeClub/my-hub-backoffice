import { MissionStatus } from '@/types/mission/MissionStatus';

export interface Mission {
  id: string;
  title: string;
  client: string;
  status: MissionStatus;
  applications: number;
  linkedIn?: string;
}
