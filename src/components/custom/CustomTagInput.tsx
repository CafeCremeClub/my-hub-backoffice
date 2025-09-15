"use client";

import React, {useState, KeyboardEvent, useEffect} from "react";
import {cn} from "@/lib/utils";


interface CustomTagInputProps {
    maxItems?: number;
    showMaxItemsText?: boolean;
    placeholder?: string;
    isError?: boolean;
    value?: string[];
    onChange?: (tags: string[]) => void;
    onBlur?: () => void;
}

const CustomTagInput = ({
                            maxItems = 3,
                            showMaxItemsText = true,
                            placeholder,
                            isError = false,
                            value = [],
                            onChange,
                            onBlur,
                            ...props
                        }: CustomTagInputProps & React.ComponentProps<"input">) => {

    const [tags, setTags] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState("");

    // Sync internal state with external value
    useEffect(() => {
        setTags(value);
    }, [value]);

    const updateTags = (newTags: string[]) => {
        setTags(newTags);
        onChange?.(newTags);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (tags.length < maxItems && !tags.includes(inputValue.trim())) {
                const newTags = [...tags, inputValue.trim()];
                updateTags(newTags);
            }
            setInputValue("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        updateTags(newTags);
    };


    return (
        <div className="w-full">
            <div
                className={cn(
                    "flex flex-wrap min-h-[2.75rem] items-center gap-2 py-2 px-3.5 bg-white rounded-[0.5rem] shadow-sm shadow-[#1018280D]",
                    isError
                        ? "border border-[#DF1C41] focus:border-[#DF1C41]"
                        : "border border-[#D0D5DD] focus:border focus:!border-gray-400",
                )}
            >
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white border border-[#D0D5DD] rounded-[0.375rem] px-1 py-0.5 text-sm"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-[#98A2B3] hover:text-gray-700 cursor-pointer text-xs"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {tags.length < maxItems && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className="flex-1 min-w-[120px] outline-none border-none text-sm text-gray-700 placeholder-gray-400"
                        {...props}
                    />
                )}
            </div>
            {
                showMaxItemsText ?
                    <p className="text-sm text-[#475467] mt-1">{maxItems} secteurs maximum</p> : null
            }
        </div>
    );
};

export default CustomTagInput;