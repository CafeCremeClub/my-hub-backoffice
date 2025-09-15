"use client";

import React from 'react';
import DashboardContentHeader from "@/components/dashboard/DashboardContentHeader";
import KpisBox from "@/components/dashboard/kpis/KpisBox";
import MissionsTable from "@/components/dashboard/mission/MissionsTable";

const DashboardContent = () => {


    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <DashboardContentHeader/>
            <KpisBox/>
            <MissionsTable/>
        </div>
    );
};

export default DashboardContent;