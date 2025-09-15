"use client";

import React, {useState} from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomPhoneInputProps {
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    onBlur?: () => void;
    disabled?: boolean;
    numberInputClassName?: string;
    placeholder?: string;
    isError?: boolean;
}

const CustomPhoneInput = ({
                              value,
                              onChange,
                              onBlur,
                              disabled = false,
                              numberInputClassName,
                              placeholder,
                              isError = false
                          }: CustomPhoneInputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <PhoneInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={() => setIsFocused(true)}
            onBlurCapture={() => setIsFocused(false)}
            defaultCountry="FR"
            className={`cursor-pointer shadow-sm shadow-[#1018280D] h-[2.75rem] ps-3.5 bg-white rounded-[0.5rem] ${
                isFocused
                    ? "border border-gray-400 transition ease-in-out duration-150"
                    : isError
                        ? "border border-[#DF1C41]"
                        : "border border-[#D0D5DD]"
            } ${
                disabled ? "opacity-50" : ""
            }`}
            numberInputProps={{
                className: `w-full h-[2.75rem] ps-1.5 rounded-e-[0.5rem] border-e-0 border-y border-y-[#D0D5DD] focus:border-y focus:border-y-gray-400 focus:outline-none focus:ring-0 placeholder:text-[#667085] text-sm placeholder:text-sm ${
                    numberInputClassName
                } ${
                    isFocused
                        ? "border border-gray-400 transition ease-in-out duration-150" :
                        isError
                            ? "border !border-[#DF1C41]"
                            : "border border-y-[#D0D5DD]"
                }`
            }}
            disabled={disabled}
        />
    );
};

export default CustomPhoneInput;