import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    defaultValue?: string;
    maxLength?: number;
}

const FormInput = ({
    name,
    label,
    placeholder = "",
    type = "text",
    disabled = false,
    className = "",
    required = false,
    defaultValue = "",
    maxLength,
}: FormInputProps) => {
    const { control, watch } = useFormContext();
    const currentValue = watch(name) || "";

    const renderInput = () => {
        if (type === "textarea") {
            return (
                <div>
                    <Textarea
                        className="w-full resize-none"
                        placeholder={placeholder}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        maxLength={maxLength}
                        rows={3}
                        {...control.register(name, { required })}
                    />
                    {maxLength && (
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {currentValue.length}/{maxLength}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Input
                className="w-full"
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue}
                maxLength={maxLength}
                {...control.register(name, { required })}
            />
        );
    };

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                {renderInput()}
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default FormInput;