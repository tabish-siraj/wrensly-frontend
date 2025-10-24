"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, User } from "@/src/schema";
import FormInput from "@/components/form-input/FormInput";
import useUserStore from "@/src/stores/userStore";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { removeEmptyFields } from "@/lib/utils";
// import ProfileCard from "@/components/card/ProfileCard";


export default function EditPage() {
    const { user } = useUserStore();
    const updateProfile = useUpdateProfile();
    const dateOfBirth = user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "";
    const form = useForm<User>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: user?.username || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            dateOfBirth: dateOfBirth || "",
            gender: user?.gender || "",
            bio: user?.bio || "",
            avatar: user?.avatar || "",
            cover: user?.cover || "",
            city: user?.city || "",
            state: user?.state || "",
            country: user?.country || "",
            phone: user?.phone || "",
            website: user?.website || "",
        }
    });
    const fields = [
        { name: "firstName", label: "First Name", placeholder: "Enter your first name", required: true },
        { name: "lastName", label: "Last Name", placeholder: "Enter your last name", required: true },
        { name: "dateOfBirth", label: "Date of Birth", placeholder: "Enter your date of birth", required: false, type: "date" },
        { name: "gender", label: "Gender", placeholder: "Enter your gender", required: false },
        { name: "bio", label: "Bio", placeholder: "Enter your bio", required: false },
        // { name: "avatar", label: "Avatar", placeholder: "Enter your avatar", required: false },
        // { name: "cover", label: "Cover", placeholder: "Enter your cover", required: false },
        { name: "city", label: "City", placeholder: "Enter your city", required: false },
        { name: "state", label: "State", placeholder: "Enter your state", required: false },
        { name: "country", label: "Country", placeholder: "Enter your country", required: false },
        { name: "phone", label: "Phone", placeholder: "Enter your phone", required: false },
        { name: "website", label: "Website", placeholder: "Enter your website", required: false },
    ];

    const onSubmit = (data: User) => {
        const parsedPayload = removeEmptyFields(data);
        updateProfile.mutate({ id: user?.id || "", payload: parsedPayload });
    };

    return (
        <>
            {/* <ProfileCard /> */}
            <FormProvider {...form}>
                <h1 className="text-2xl font-bold text-center my-6">Edit Profile</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 block">
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