import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import NoDataBox from "@/components/dashboard/NoDataBox";
import ApplicationsTablePaginationControls
    from "@/components/dashboard/applications/ApplicationsTablePaginationControls";
import {GetApplicationsByMissionIdResponse} from "@/types/applications/GetApplicationsByMissionIdResponse";
import {Skill} from "@/types/mission/Skill";
import SkillsDialog from "@/components/dashboard/applications/SkillsDialog";


interface ApplicationsTableProps {
    response: GetApplicationsByMissionIdResponse
    handlePageChange: (page: number) => void
}

const ApplicationsTable = ({response, handlePageChange}: ApplicationsTableProps) => {

    const {data: applications, count} = response

    const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState<boolean>(false);
    const [skills, setSkills] = useState<Skill[]>([])

    return (
        <>

            <SkillsDialog
                isOpen={isSkillsDialogOpen}
                onClose={() => setIsSkillsDialogOpen(false)}
                skills={skills}
            />

            <div className={`flex flex-col gap-4 border border-[#EAECF0] rounded-[0.75rem] ${
                applications.length === 0 ? "h-full" : ""
            }`}>
                <div
                    className="flex items-center gap-2 px-4 pt-4 text-[#101828] font-semibold text-2xl  bricolage-grotesque tracking-tighter">
                    Les candidatures à ce poste
                    <Badge
                        className="bg-[#ECFDF3] text-[#079455] text-xs font-medium min-w-10 h-6 rounded-full border border-[#ABEFC6]"
                    >
                        {count}
                    </Badge>
                </div>
                {
                    applications && applications.length > 0 ? (
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
                                        Addresse email
                                    </TableHead>
                                    <TableHead
                                        className="text-xs font-medium text-[#475467]">
                                        Compétences
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.map((application, index) => (
                                    <TableRow
                                        key={index}
                                        className={`h-[4.5rem] cursor-pointer ${
                                            index < applications.length - 1 ? "!border-b border-b-[#EAECF0]" : ""
                                        }`}
                                    >
                                        <TableCell
                                            className="font-medium text-[#101828] text-sm">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="flex items-center justify-center bg-[#F2F4F7] border border-[#00000014] size-10 rounded-full flex-none text-[#667085] font-semibold bricolage-grotesque tracking-tighter">
                                                    {application.firstname.charAt(0).toUpperCase()}{application.lastname.charAt(0).toUpperCase()}
                                                </div>
                                                <p>{application.firstname} {application.lastname}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[#101828] text-sm">
                                            {application.profession}
                                        </TableCell>
                                        <TableCell className="text-[#101828] text-sm">
                                            {application.email}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {application.skills && application.skills.length > 0 ? application.skills.slice(0, 3).map((skill, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        className="bg-[#F9F5FF] text-[#6941C6] text-xs font-medium h-8 rounded-full border border-[#E9D7FE]"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )) : <span className="text-sm text-[#667085]">Aucune compétence</span>}
                                                {application.skills && application.skills.length > 3 ? (
                                                    <Badge
                                                        className="bg-[#F9FAFB] text-[#344054] text-xs font-medium h-8 rounded-full border border-[#EAECF0]"
                                                        onClick={() => {
                                                            if (application.skills) {
                                                                setSkills(application.skills)
                                                                setIsSkillsDialogOpen(true);
                                                            }
                                                        }}
                                                    >
                                                        +{application.skills.length - 3}
                                                    </Badge>
                                                ) : null}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <NoDataBox
                            message="Aucune application disponible pour le moment."
                        />
                    )
                }

                {
                    response ?
                        <ApplicationsTablePaginationControls
                            currentPage={response.page}
                            totalCount={response.count}
                            perPage={response.perPage}
                            onPageChange={handlePageChange}
                        /> : null
                }
            </div>
        </>
    );
};

export default ApplicationsTable;