'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CustomTextareaProps {
  className?: string;
  isError?: boolean;
}

const CustomTextarea = ({
  className,
  isError = false,
  ...props
}: CustomTextareaProps & React.ComponentProps<'textarea'>) => {
  return (
    <div className="relative w-full h-max">
      <Textarea
        className={cn(
          'shadow-sm shadow-[#1018280D] min-h-[6rem] px-3.5 py-3 bg-white rounded-[0.5rem] text-[#1B55F5] text-sm focus:outline-none focus:!ring-0 placeholder:text-[#667085] placeholder:text-sm resize-none',
          isError
            ? 'border border-[#DF1C41] focus:border-[#DF1C41]'
            : 'border border-[#D0D5DD] focus:border focus:!border-gray-400',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default CustomTextarea;
