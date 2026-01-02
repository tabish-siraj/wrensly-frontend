"use client";

import { useState } from "react";
import { SelectField } from "./select-field";
import { COUNTRY_CODES } from "@/lib/locationData";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function PhoneInput({
    value = "",
    onChange,
    placeholder = "Enter phone number",
    disabled = false,
    className,
}: PhoneInputProps) {
    // Parse existing value to extract country code and number
    const parsePhoneValue = (phoneValue: string) => {
        if (!phoneValue) return { countryCode: "+1", number: "" };

        // Find matching country code
        const matchingCode = COUNTRY_CODES.find(cc => phoneValue.startsWith(cc.code));
        if (matchingCode) {
            return {
                countryCode: matchingCode.code,
                number: phoneValue.substring(matchingCode.code.length).trim()
            };
        }

        return { countryCode: "+1", number: phoneValue };
    };

    const { countryCode: initialCountryCode, number: initialNumber } = parsePhoneValue(value);
    const [countryCode, setCountryCode] = useState(initialCountryCode);
    const [number, setNumber] = useState(initialNumber);

    const handleCountryCodeChange = (newCountryCode: string) => {
        setCountryCode(newCountryCode);
        onChange(`${newCountryCode} ${number}`.trim());
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value;
        setNumber(newNumber);
        onChange(`${countryCode} ${newNumber}`.trim());
    };

    const countryCodeOptions = COUNTRY_CODES.map(cc => ({
        value: cc.code,
        label: `${cc.country} ${cc.code}`,
        flag: cc.flag,
        code: cc.code,
    }));

    return (
        <div className={cn("flex gap-2", className)}>
            <div className="w-32">
                <SelectField
                    options={countryCodeOptions}
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    placeholder="Code"
                    disabled={disabled}
                    showFlag={true}
                />
            </div>
            <div className="flex-1">
                <input
                    type="tel"
                    value={number}
                    onChange={handleNumberChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                    )}
                />
            </div>
        </div>
    );
}