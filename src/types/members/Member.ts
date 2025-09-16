import {Industry} from "@/types/mission/Industry";
import {Job} from "@/types/mission/Job";
import {Skill} from "@/types/mission/Skill";


export interface Member {
    id: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    profession: string;
    tjm: string;
    expertise: string;
    industry: Industry[];
    desiredJobs: Job[];
    skills: Skill[] | null;
    cv: string;
    linkedIn: string;
    whatsApp: string;
    country: string;
    city: string;
    bio: string;
}