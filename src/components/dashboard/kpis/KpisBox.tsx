import React from 'react';
import KpiCard from '@/components/dashboard/kpis/KpiCard';
import useGetKpiStats from '@/hooks/stats/useGetKpiStats';
import KpiSkeleton from '@/components/dashboard/kpis/KpiSkeleton';
import ErrorBox from '@/components/dashboard/ErrorBox';

const KpisBox = () => {
  const { isPending, isError, data } = useGetKpiStats();

  if (isPending) {
    return <KpiSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorBox message="Une erreur est survenue lors du chargement des indicateurs clés." />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <KpiCard title="Nombres de missions" value={data.missions} />
      <KpiCard title="Membres Community" value={data.members} />
      <KpiCard
        title="Nombre de candidatures actives"
        value={data.activeMembers}
      />
    </div>
  );
};

export default KpisBox;
