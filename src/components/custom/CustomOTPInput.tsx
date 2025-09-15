import React from 'react';
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

interface CustomOTPInputProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
}

const CustomOtpInput = ({value, onChange, maxLength = 4}: CustomOTPInputProps) => {
    return (
        <InputOTP
            maxLength={maxLength}
            value={value}
            onChange={onChange}
        >
            <InputOTPGroup
                className="flex gap-1.5"
            >
                {
                    Array.from({
                        length: maxLength
                    }).map((_, i) => (
                        <InputOTPSlot
                            key={i}
                            index={i}
                            className="size-20 text-[#1B55F5] text-5xl font-medium !border-2 border-[#1734B6] !rounded-[0.625rem] active:!border-[#1734B6] active:ring-4 !ring-[#528BFF26]"
                        />
                    ))
                }
            </InputOTPGroup>
        </InputOTP>
    );
};

export default CustomOtpInput;