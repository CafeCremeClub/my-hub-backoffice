"use client"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {X, ChevronDown} from "lucide-react"
import {cn} from "@/lib/utils"
import {useEffect, useRef, useState} from "react"

interface CustomMultiSelectProps {
    value?: string[]
    onChange?: (value: string[]) => void
    placeholder?: string
    options: { label: string; value: string }[]
    className?: string
    isError?: boolean
    disabled?: boolean
}

const CustomMultiSelect = ({
                               value = [],
                               onChange,
                               placeholder = "Select options",
                               options,
                               className,
                               isError = false,
                               disabled = false,
                           }: CustomMultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLButtonElement>(null)
    const [lineCount, setLineCount] = useState(1)

    useEffect(() => {
        if (containerRef.current && value.length > 0) {
            const container = containerRef.current
            const tagsContainer = container.querySelector("[data-tags-container]")

            if (!tagsContainer) {
                setLineCount(1)
                return
            }

            const tags = tagsContainer.querySelectorAll("[data-tag]")

            if (tags.length === 0) {
                setLineCount(1)
                return
            }

            let currentLine = 1
            let previousTop = (tags[0] as HTMLElement).offsetTop

            for (let i = 1; i < tags.length; i++) {
                const currentTop = (tags[i] as HTMLElement).offsetTop
                if (currentTop > previousTop) {
                    currentLine++
                    previousTop = currentTop
                }
            }

            setLineCount(currentLine)
        } else {
            setLineCount(1)
        }
    }, [value])

    const handleSelect = (selectedValue: string) => {
        if (!value.includes(selectedValue)) {
            onChange?.([...value, selectedValue])
        }
    }

    const handleRemove = (valueToRemove: string) => {
        onChange?.(value.filter((v) => v !== valueToRemove))
    }

    const availableOptions = options.filter((option) => !value.includes(option.value))

    const getBorderRadius = () => {
        if (lineCount === 1) return "rounded-[0.5rem]"
        if (lineCount === 2) return "rounded-[0.5rem]"
        return "rounded-[0.5rem]"
    }

    return (
        <div className="relative">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button
                        ref={containerRef}
                        disabled={disabled}
                        className={cn(
                            "shadow-sm shadow-[#1018280D] px-3.5 !min-h-[2.75rem] !h-auto bg-white border text-sm focus:outline-none focus:!ring-0 transition-all duration-200 w-full text-left flex items-center justify-between",
                            getBorderRadius(),
                            isError
                                ? "border-[#DF1C41] focus:border-[#DF1C41]"
                                : "border-[#D0D5DD] focus:border focus:!border-gray-400",
                            disabled && "opacity-50 cursor-not-allowed",
                            lineCount > 1 ? "py-4" : "",
                            className,
                        )}
                    >
                        <div className="flex flex-wrap gap-2 w-full" data-tags-container={true}>
                            {value.length === 0 ? (
                                <span className="text-[#667085] text-sm">{placeholder}</span>
                            ) : (
                                <>
                                    {value.map((selectedValue) => {
                                        const label = options.find((opt) => opt.value === selectedValue)?.label || selectedValue
                                        return (
                                            <div
                                                key={selectedValue}
                                                data-tag={true}
                                                className="inline-flex items-center gap-1 text-white bg-[#1B55F5] px-3 py-1 rounded-full text-sm"
                                            >
                                                <span>{label}</span>
                                                <span
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        handleRemove(selectedValue)
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                    }}
                                                    className="ml-1 bg-white bg-opacity-20 rounded-full p-0.5 transition-colors hover:bg-opacity-30"
                                                >
                                                    <X className="text-white size-3"/>
                                                </span>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#667085]"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 rounded-lg shadow-lg bg-white overflow-hidden" align="start">
                    <div className="max-h-60 overflow-auto">
                        {availableOptions.length === 0 ? (
                            <div className="px-3 py-2 text-[#667085] text-sm">All options selected</div>
                        ) : (
                            availableOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#1B55F5]"
                                >
                                    {option.label}
                                </div>
                            ))
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CustomMultiSelect