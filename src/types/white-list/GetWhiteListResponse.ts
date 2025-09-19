export interface GetWhiteListResponse {
    page: number;
    perPage: number;
    total: number;
    data: {
        email: string;
    }[];
}
