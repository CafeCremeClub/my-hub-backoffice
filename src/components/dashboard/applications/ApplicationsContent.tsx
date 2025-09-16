"use client";

import React, {useState} from 'react';
import useGetApplicationsByMissionId from "@/hooks/applications/useGetApplicationsByMissionId";
import LoadingBox from "@/components/dashboard/LoadingBox";
import ErrorBox from "@/components/dashboard/ErrorBox";
import ApplicationsTable from "@/components/dashboard/applications/ApplicationsTable";

interface ApplicationsContentProps {
    id: string;
}

const ApplicationsContent = ({id}: ApplicationsContentProps) => {

    const [page, setPage] = useState<number>(1);

    const {isPending, isError, data} = useGetApplicationsByMissionId(id, {
        page
    })


    if (isPending) {
        return (
            <LoadingBox/>
        )
    }

    if (isError || !data) {
        return (
            <ErrorBox
                message="Une erreur est survenue lors du chargement des candidatures."
            />
        )
    }

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="flex lg:flex-row flex-col lg:justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <div className="font-semibold tracking-tighter text-4xl text-[#1734B6] bricolage-grotesque">
                        Les details des candidatures
                    </div>
                </div>
            </div>
            <ApplicationsTable
                response={data}
                handlePageChange={(newPage: number) => setPage(newPage)}
            />
        </div>
    );
};

export default ApplicationsContent;