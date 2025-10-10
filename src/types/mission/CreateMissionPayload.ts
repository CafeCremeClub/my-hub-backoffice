import { Industry } from '@/types/mission/Industry';
import { Skill } from '@/types/mission/Skill';

export interface CreateMissionPayload {
  title: string;
  client: string;
  tjm: number;
  industry: Industry[];
  skills: Skill[];
  link: string;
  linkedIn?: string;
  whatsApp: string;
  companyBio: string;
}
