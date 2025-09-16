import React, {useState} from 'react';
import useGetMissions from "@/hooks/mission/useGetMissions";
import ErrorBox from "@/components/dashboard/ErrorBox";
import MissionsSkeletonTable from "@/components/dashboard/mission/MissionsSkeletonTable";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ArrowDown, Pen, Search, Trash2} from "lucide-react";
import {MissionStatus} from "@/types/mission/MissionStatus";
import NoDataBox from "@/components/dashboard/NoDataBox";
import MissionsTablePaginationControls from "@/components/dashboard/mission/MissionsTablePaginationControls";
import {Badge} from "@/components/ui/badge";
import {FaCircle} from "react-icons/fa6";
import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "@/components/custom/CustomInput";
import {useDebounce} from "@/hooks/useDebounce";
import UpdateMissionStatusDialog from "@/components/dashboard/mission/UpdateMissionStatusDialog";
import {Mission} from "@/types/mission/Mission";
import DeleteMissionAlertDialog from "@/components/dashboard/mission/DeleteMissionAlertDialog";
import {useRouter} from "next/navigation";

const DashboardContentMissionsTable = () => {

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [currentMission, setCurrentMission] = useState<Mission | null>(null);
    const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);


    const router = useRouter();
    // Debounce search input to avoid too many requests
    const debouncedSearch = useDebounce(search, 500)

    const {
        isPending,
        isError,
        data: missions
    } = useGetMissions({
        page,
        search: debouncedSearch && debouncedSearch.length >= 2 ? debouncedSearch : undefined,
    });


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>

            {
                currentMission !== null ?
                    <UpdateMissionStatusDialog
                        isOpen={isUpdateStatusDialogOpen}
                        onClose={() => {
                            setIsUpdateStatusDialogOpen(false)
                            setCurrentMission(null);
                        }}
                        mission={currentMission}
                    /> : null
            }

            {
                currentMission !== null ?
                    <DeleteMissionAlertDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={() => {
                            setIsDeleteDialogOpen(false)
                            setCurrentMission(null);
                        }}
                        mission={currentMission}
                    /> : null
            }

            <div className="flex flex-col gap-6">
                <div className="xl:w-72 flex-none">
                    <CustomInput
                        id="search"
                        name="search"
                        leftIcon={<Search className="size-5 text-[#667085]"/>}
                        placeholder="Nom de la mission"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {
                    isPending ? (
                        <MissionsSkeletonTable/>
                    ) : isError ? (
                        <ErrorBox
                            message="Une erreur est survenue lors du chargement des missions. Veuillez réessayer plus tard."
                        />
                    ) : (
                        <div className="flex flex-col gap-4 border border-[#EAECF0] rounded-[0.75rem]">
                            {
                                missions && missions.data.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead
                                                    className="flex items-center gap-2 text-xs font-medium text-[#475467] min-w-40">Mission <ArrowDown
                                                    className="size-4"/></TableHead>
                                                <TableHead className="text-xs font-medium text-[#475467] min-w-40">Statuts
                                                    du
                                                    recrutement</TableHead>
                                                <TableHead className="text-xs font-medium text-[#475467] min-w-40">Nombre
                                                    de
                                                    candidates</TableHead>
                                                <TableHead
                                                    className="text-xs font-medium text-[#475467] w-32"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {missions.data.map((mission, index) => (
                                                <TableRow
                                                    key={index}
                                                    className={`h-[4.5rem] cursor-pointer ${
                                                        index < missions.data.length - 1 ? "!border-b border-b-[#EAECF0]" : ""
                                                    }`}
                                                    onClick={() => router.push(`/dashboard/mission/${mission.id}/applications`)}
                                                >
                                                    <TableCell
                                                        className="font-medium text-[#101828] text-sm">
                                                        <div className="flex flex-col">
                                                            <p>{mission.title}</p>
                                                            <p className="font-normal text-[#475467]">{mission.client}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-[#101828] text-sm">
                                                        <Badge variant={
                                                            mission.status === MissionStatus.OPEN
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                               className="flex items-center gap-1 rounded-[0.375rem] py-0.5 text-xs border border-[#D0D5DD] text-[#344054] bg-white"
                                                        >
                                                            <FaCircle className={`!size-1.5 ${
                                                                mission.status === MissionStatus.OPEN ? "text-[#17B26A]" : "text-[#667085]"
                                                            }`}/>
                                                            {mission.status === MissionStatus.OPEN ? "Ouvert" : "Fermé"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-[#101828] text-sm">
                                                        {mission.applications}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <CustomButton
                                                                className="size-10 bg-white border-white hover:bg-gray-100 shadow-none"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();

                                                                    setCurrentMission(mission);
                                                                    setIsDeleteDialogOpen(true);
                                                                }}
                                                            >
                                                                <Trash2 className="flex-none text-[#94969C]"/>
                                                            </CustomButton>
                                                            <CustomButton
                                                                className="size-10 bg-white border-white hover:bg-gray-100 shadow-none"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();

                                                                    setCurrentMission(mission);
                                                                    setIsUpdateStatusDialogOpen(true);
                                                                }}
                                                            >
                                                                <Pen className="flex-none text-[#94969C]"/>
                                                            </CustomButton>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <NoDataBox
                                        message="Aucune mission disponible pour le moment."
                                    />
                                )
                            }

                            {
                                missions ?
                                    <MissionsTablePaginationControls
                                        currentPage={missions.page}
                                        totalCount={missions.count}
                                        perPage={missions.perPage}
                                        onPageChange={handlePageChange}
                                    /> : null
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default DashboardContentMissionsTable;