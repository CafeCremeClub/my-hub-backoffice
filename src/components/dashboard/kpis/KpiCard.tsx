import React from 'react';

interface KpiCardProps {
    title: string;
    value: number | string;
}

const KpiCard = ({title, value}: KpiCardProps) => {
    return (
        <div className="flex flex-col gap-6 p-6 rounded-[0.75rem] bg-white border border-[#EAECF0] shadow-sm shadow-[#1018280D]">
            <p className="text-[#101828] font-semibold bricolage-grotesque">
                {title}
            </p>

            <p className="text-[#1734B6] text-4xl font-semibold bricolage-grotesque">
                {value}
            </p>
        </div>
    );
};

export default KpiCard;