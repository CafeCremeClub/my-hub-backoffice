import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingBox = () => {
  return (
    <div className="flex items-center justify-center p-8 w-full h-full">
      <Loader2 className="size-10 text-[#1734B6] animate-spin" />
    </div>
  );
};

export default LoadingBox;
