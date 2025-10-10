import { Application } from '@/types/applications/Application';

export interface GetApplicationsByMissionIdResponse {
  page: number;
  perPage: number;
  count: number;
  data: Application[];
}
