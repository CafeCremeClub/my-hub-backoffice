import React from 'react';
import { CircleAlert } from 'lucide-react';

interface ErrorBoxProps {
  message: string;
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 rounded-3xl py-6 px-8 bg-[#F4F9FF]">
      <CircleAlert className="text-red-500 size-12" />
      <p className="text-red-500 text-center">{message}</p>
    </div>
  );
};

export default ErrorBox;
