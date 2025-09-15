import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

const KpiSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton
                className="h-36 rounded-[0.75rem] border border-[#EAECF0] shadow-sm shadow-[#1018280D]"
            />
            <Skeleton
                className="h-36 rounded-[0.75rem] border border-[#EAECF0] shadow-sm shadow-[#1018280D]"
            />
            <Skeleton
                className="h-36 rounded-[0.75rem] border border-[#EAECF0] shadow-sm shadow-[#1018280D]"
            />
        </div>
    );
};

export default KpiSkeleton;