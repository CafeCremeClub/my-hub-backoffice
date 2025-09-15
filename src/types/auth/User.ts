import {UserRole} from "@/types/auth/UserRole";


export interface User {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}