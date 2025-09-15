"use client";

import React from 'react';
import DashboardContentHeader from "@/components/dashboard/DashboardContentHeader";
import DashboardContentKpis from "@/components/dashboard/kpis/DashboardContentKpis";

const DashboardContent = () => {


    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <DashboardContentHeader/>
            <DashboardContentKpis/>
        </div>
    );
};

export default DashboardContent;