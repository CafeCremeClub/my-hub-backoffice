import { User } from '@/types/auth/User';

export interface SignInResponse {
  user: User;
  info: boolean;
  profile: boolean;
  accessToken: string;
}
