import React, { use } from 'react';
import ApplicationsContent from '@/components/dashboard/applications/ApplicationsContent';

interface MissionApplicationsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MissionApplicationsPage = ({ params }: MissionApplicationsPageProps) => {
  const { id } = use(params);

  return <ApplicationsContent id={id} />;
};

export default MissionApplicationsPage;
