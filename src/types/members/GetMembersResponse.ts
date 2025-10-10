import { Member } from '@/types/members/Member';

export interface GetMembersResponse {
  page: number;
  perPage: number;
  total: number;
  data: Member[];
}
