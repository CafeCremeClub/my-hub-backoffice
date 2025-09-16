import React from 'react';
import MembersTable from "@/components/dashboard/members/MembersTable";

const MembersPage = () => {
    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="flex lg:flex-row flex-col lg:justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <div className="font-semibold tracking-tighter text-4xl text-[#1734B6] bricolage-grotesque">
                        Liste des membres
                    </div>
                </div>
            </div>
            <MembersTable/>
        </div>
    );
};

export default MembersPage;