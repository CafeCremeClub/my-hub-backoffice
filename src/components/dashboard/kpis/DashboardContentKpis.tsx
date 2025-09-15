import React from 'react';
import KpiCard from "@/components/dashboard/kpis/KpiCard";

const DashboardContentKpis = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <KpiCard
                title="Nombres de missions"
                value={120}
            />
            <KpiCard
                title="Membres Community"
                value={760}
            />
            <KpiCard
                title="Nombre de candidatures actives"
                value={316}
            />
        </div>
    );
};

export default DashboardContentKpis;