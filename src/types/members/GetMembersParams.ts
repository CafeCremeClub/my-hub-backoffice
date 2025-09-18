import {GetMembersOrderBy} from "@/types/members/GetMembersOrderBy";

export interface GetMembersParams {
    page?: number;
    perPage?: number;
    orderBy?: GetMembersOrderBy;
    direction?: "ASC" | "DESC";
}