import React from 'react';
import { BsDatabaseFillSlash } from 'react-icons/bs';

interface NoDataBoxProps {
  message?: string;
}

const NoDataBox = ({
  message = 'Aucune donnée disponible pour le moment.',
}: NoDataBoxProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4 p-6 text-center text-sm text-[#475467]">
      <BsDatabaseFillSlash className="flex-none size-10" />
      {message}
    </div>
  );
};

export default NoDataBox;
