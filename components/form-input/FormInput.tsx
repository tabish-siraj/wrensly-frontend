import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
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
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <Input
                    className="w-full"
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    {...control.register(name, { required })}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default FormInput;