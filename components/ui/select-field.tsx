"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
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
    searchable?: boolean;
    searchPlaceholder?: string;
}

export function SelectField({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className,
    showFlag = false,
    searchable = false,
    searchPlaceholder = "Search...",
}: SelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find(option => option.value === value);

    // Filter options based on search term
    const filteredOptions = searchable && searchTerm
        ? options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (option.code && option.code.includes(searchTerm))
        )
        : options;

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleOpen = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setSearchTerm("");
        }
    };

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={handleOpen}
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
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                        {searchable && (
                            <div className="p-2 border-b border-gray-200">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder={searchPlaceholder}
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="max-h-48 overflow-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
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
                                ))
                            ) : (
                                <div className="px-3 py-2 text-gray-500 text-sm">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}