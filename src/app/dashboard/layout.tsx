"use client";

import React, {useState} from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import SheetSidebar from "@/components/dashboard/SheetSidebar";
import CustomButton from "@/components/custom/CustomButton";
import {Menu} from "lucide-react";


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    return (
        <>
            <SheetSidebar isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}/>
            <div className="flex flex-col h-screen bg-white overflow-hidden">
                <div className="block md:hidden p-1.5">
                    <CustomButton
                        onClick={() => setIsSheetOpen(true)}
                        className="size-9"
                    >
                        <Menu className="size-4"/>
                    </CustomButton>
                </div>
                <div className="flex flex-1 h-full overflow-y-auto">
                    <div className="md:inline hidden">
                        <Sidebar/>
                    </div>
                    <main className="min-h-screen overflow-y-auto w-full scroll-hidden pt-3">
                        <div className="h-full p-8 rounded-t-[2.5rem] border-t border-x border-[#EAECF0]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;