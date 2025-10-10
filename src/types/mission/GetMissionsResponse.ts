import { Mission } from '@/types/mission/Mission';

export interface GetMissionsResponse {
  page: number;
  perPage: number;
  count: number;
  data: Mission[];
}
