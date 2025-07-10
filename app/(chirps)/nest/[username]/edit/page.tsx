"use client";

import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, User } from "@/src/schema";
import FormInput from "@/components/form-input/FormInput";
// import NestCard from "@/components/card/NestCard";


export default function EditPage() {
    const params = useParams();
    const form = useForm<User>({
        resolver: zodResolver(UserSchema)
    });
    const { handleSubmit } = form;
    const fields = [
        { name: "firstName", label: "First Name", placeholder: "Enter your first name", required: true },
        { name: "lastName", label: "Last Name", placeholder: "Enter your last name", required: true },
        { name: "dateOfBirth", label: "Date of Birth", placeholder: "Enter your date of birth", required: false, type: "date" },
        { name: "gender", label: "Gender", placeholder: "Enter your gender", required: false },
        { name: "bio", label: "Bio", placeholder: "Enter your bio", required: false },
        { name: "avatar", label: "Avatar", placeholder: "Enter your avatar", required: false },
        { name: "cover", label: "Cover", placeholder: "Enter your cover", required: false },
        { name: "city", label: "City", placeholder: "Enter your city", required: false },
        { name: "state", label: "State", placeholder: "Enter your state", required: false },
        { name: "country", label: "Country", placeholder: "Enter your country", required: false },
        { name: "phone", label: "Phone", placeholder: "Enter your phone", required: false },
        { name: "website", label: "Website", placeholder: "Enter your website", required: false },
    ];
    return (
        <>
            {/* <NestCard /> */}
            <FormProvider {...form}>
                <h1 className="text-2xl font-bold text-center my-6">Edit Profile</h1>
                <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4 block">
                    {fields.map((field) => (
                        <FormInput
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            required={field.required}
                            type={field.type || "text"}
                        />
                    ))}
                    <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 font-bold py-2 px-4 rounded w-1/2 mx-auto block shadow transition">
                        Update Profile
                    </button>
                </form>
            </FormProvider>
        </>

    );
}