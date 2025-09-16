import {Industry} from "@/types/mission/Industry";
import {Job} from "@/types/mission/Job";
import {Skill} from "@/types/mission/Skill";

export interface Application {
    id: string;
    firstname: string;
    lastname: string;
    profession: string;
    email: string;
    phone: string;
    tjm: string;
    expertise: string;
    industry: Industry[];
    desiredJobs: Job[];
    cv: string;
    bio: string | null;
    skills: Skill[] | null;
    note: string;
}