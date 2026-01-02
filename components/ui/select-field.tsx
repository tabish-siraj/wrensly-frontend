"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
    flag?: string;
    code?: string;
}

interface SelectFieldProps {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    showFlag?: boolean;
}

export function SelectField({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className,
    showFlag = false,
}: SelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
                    "flex items-center justify-between",
                    className
                )}
            >
                <span className="flex items-center gap-2">
                    {showFlag && selectedOption?.flag && (
                        <span className="text-lg">{selectedOption.flag}</span>
                    )}
                    {selectedOption?.code && (
                        <span className="font-mono text-sm">{selectedOption.code}</span>
                    )}
                    <span className={cn(
                        selectedOption ? "text-gray-900" : "text-gray-500"
                    )}>
                        {selectedOption?.label || placeholder}
                    </span>
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform",
                    isOpen && "transform rotate-180"
                )} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    "w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between",
                                    value === option.value && "bg-blue-50 text-blue-600"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    {showFlag && option.flag && (
                                        <span className="text-lg">{option.flag}</span>
                                    )}
                                    {option.code && (
                                        <span className="font-mono text-sm">{option.code}</span>
                                    )}
                                    <span>{option.label}</span>
                                </span>
                                {value === option.value && (
                                    <Check className="w-4 h-4 text-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}