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
        const actualCode = newCountryCode.split('-')[0]; // Extract "+1" from "+1-US"
        if (actualCode) {
            setCountryCode(actualCode);
            onChange(`${actualCode} ${number}`.trim());
        }
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value;
        setNumber(newNumber);
        onChange(`${countryCode} ${newNumber}`.trim());
    };

    const getCurrentValue = () => {
        // Find the matching option based on current country code
        const matchingOption = countryCodeOptions.find(option =>
            option.value.startsWith(countryCode)
        );
        return matchingOption?.value || `${countryCode}-US`; // Default to US if not found
    };

    const countryCodeOptions = COUNTRY_CODES.map(cc => ({
        value: `${cc.code}-${cc.country}`, // Unique value: "+1-US", "+1-CA"
        label: `${cc.country} ${cc.code}`,  // Clean display: "US +1", "CA +1"
        // flag: cc.flag,
        // code: cc.code,
    }));

    return (
        <div className={cn("flex gap-2", className)}>
            <div className="w-32">
                <SelectField
                    options={countryCodeOptions}
                    value={getCurrentValue()}
                    onChange={handleCountryCodeChange}
                    placeholder="Code"
                    disabled={disabled}
                    showFlag={true}
                    searchable={true}
                    searchPlaceholder="Search countries..."
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