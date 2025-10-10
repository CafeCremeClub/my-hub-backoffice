'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps {
  className?: string;
  isError?: boolean;
  leftIcon?: React.ReactNode;
}

const CustomInput = ({
  className,
  type = 'text',
  isError = false,
  leftIcon,
  ...props
}: CustomInputProps & React.ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative w-full h-max">
      {leftIcon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-gray-500">
          {leftIcon}
        </span>
      )}
      <Input
        type={inputType}
        className={cn(
          'shadow-sm shadow-[#1018280D] h-[2.75rem] px-3.5 bg-white rounded-[0.5rem] text-[#1B55F5] text-sm focus:outline-none focus:!ring-0 placeholder:text-[#667085] placeholder:text-sm',
          isError
            ? 'border border-[#DF1C41] focus:border-[#DF1C41]'
            : 'border border-[#D0D5DD] focus:border focus:!border-gray-400',
          leftIcon ? 'pl-12' : '',
          className
        )}
        {...props}
      />

      {type === 'password' && (
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="shadow-none bg-transparent hover:bg-transparent cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-[#475467] hover:text-gray-700 focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      )}
    </div>
  );
};

export default CustomInput;
