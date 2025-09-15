"use client";

import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import {ArrowDown} from "lucide-react";

const MissionsSkeletonTable = () => {
    return (
        <div className="flex flex-col gap-4 border border-[#EAECF0] rounded-[0.75rem]">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="flex items-center gap-2 text-xs font-medium text-[#475467] min-w-40">Mission <ArrowDown
                            className="size-4"/></TableHead>
                        <TableHead className="text-xs font-medium text-[#475467] min-w-40">Statuts du
                            recrutement</TableHead>
                        <TableHead className="text-xs font-medium text-[#475467] min-w-40">Nombre de
                            candidates</TableHead>
                        <TableHead className="text-xs font-medium text-[#475467] w-32"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({length: 5}).map((_, index) => (
                        <TableRow key={index} className={`h-[4.5rem] ${
                            index < 4 ? "!border-b border-b-[#EAECF0]" : ""
                        }`}>
                            <TableCell className="font-medium text-[#101828] text-sm">
                                <Skeleton className="h-4 w-[200px]"/>
                            </TableCell>
                            <TableCell className="text-[#101828] text-sm">
                                <Skeleton className="h-4 w-[120px]"/>
                            </TableCell>
                            <TableCell className="text-[#101828] text-sm">
                                <Skeleton className="h-4 w-[60px]"/>
                            </TableCell>
                            <TableCell className="text-[#101828] text-sm">
                                <Skeleton className="h-4 w-[60px]"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MissionsSkeletonTable;
