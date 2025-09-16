"use client"

import React, {useState} from 'react';
import MembersTablePaginationControls from "@/components/dashboard/members/MembersTablePaginationControls";
import useGetAllMembers from "@/hooks/members/useGetAllMembers";
import LoadingBox from "@/components/dashboard/LoadingBox";
import ErrorBox from "@/components/dashboard/ErrorBox";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import NoDataBox from "@/components/dashboard/NoDataBox";
import {useRouter} from "next/navigation";

const MembersTable = () => {

    const [page, setPage] = useState(1);


    const router = useRouter();
    const {isPending, isError, data: members} = useGetAllMembers({
        page
    });

    console.log(members);


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    if (isPending) {
        return (
            <LoadingBox/>
        )
    }

    if (isError || !members) {
        return (
            <ErrorBox
                message="Une erreur est survenue lors du chargement des membres."
            />
        )
    }

    return (
        <div className={`flex flex-col gap-4 border border-[#EAECF0] rounded-[0.75rem] ${
            members.data.length === 0 ? "h-full" : ""
        }`}>
            <div
                className="flex items-center gap-2 px-4 pt-4 text-[#101828] font-semibold text-2xl  bricolage-grotesque tracking-tighter">
                Les membres de MyHub
                <Badge
                    className="bg-[#ECFDF3] text-[#079455] text-xs font-medium min-w-10 h-6 rounded-full border border-[#ABEFC6]"
                >
                    {members.total}
                </Badge>
            </div>
            {
                members.data && members.data.length > 0 ? (
                    <Table>
                        <TableHeader className="bg-[#F4F9FF] h-11 border-t border-t-[#EAECF0]">
                            <TableRow>
                                <TableHead
                                    className="text-xs font-medium text-[#475467] min-w-72">
                                    Nom
                                </TableHead>
                                <TableHead className="text-xs font-medium text-[#475467] min-w-40">
                                    Profession
                                </TableHead>
                                <TableHead className="text-xs font-medium text-[#475467] min-w-40">
                                    Numéro de téléphone
                                </TableHead>
                                <TableHead
                                    className="text-xs font-medium text-[#475467]">
                                    Addresse email
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.data.map((member, index) => (
                                <TableRow
                                    key={index}
                                    className={`h-[4.5rem] cursor-pointer ${
                                        index < members.data.length - 1 ? "!border-b border-b-[#EAECF0]" : ""
                                    }`}
                                    onClick={() => router.push(`/dashboard/members/${member.id}`)}
                                >
                                    <TableCell
                                        className="font-medium text-[#101828] text-sm">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="flex items-center justify-center bg-[#F2F4F7] border border-[#00000014] size-10 rounded-full flex-none text-[#667085] font-semibold bricolage-grotesque tracking-tighter">
                                                {member.firstname.charAt(0).toUpperCase()}{member.lastname.charAt(0).toUpperCase()}
                                            </div>
                                            <p>{member.firstname} {member.lastname}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[#101828] text-sm">
                                        {member.profession}
                                    </TableCell>
                                    <TableCell className="text-[#101828] text-sm">
                                        {member.phone}
                                    </TableCell>
                                    <TableCell>
                                        {member.email}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <NoDataBox
                        message="Aucun membre n'a encore rejoint MyHub."
                    />
                )
            }

            {
                members ?
                    <MembersTablePaginationControls
                        currentPage={members.page}
                        totalCount={members.total}
                        perPage={members.perPage}
                        onPageChange={handlePageChange}
                    /> : null
            }
        </div>
    );
};

export default MembersTable;