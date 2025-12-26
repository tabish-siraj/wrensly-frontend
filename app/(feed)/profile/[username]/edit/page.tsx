"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema, EditProfile } from "@/src/schema";
import FormInput from "@/components/form-input/FormInput";
import useUserStore from "@/src/stores/userStore";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { removeEmptyFields } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProfilePage() {
    const { user } = useUserStore();
    const updateProfile = useUpdateProfile();
    const router = useRouter();

    const date_of_birth = user?.date_of_birth ? new Date(user.date_of_birth).toISOString().split("T")[0] : "";

    const form = useForm<EditProfile>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            username: user?.username || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            date_of_birth: date_of_birth || "",
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
        { name: "first_name", label: "First Name", placeholder: "Enter your first name", required: true },
        { name: "last_name", label: "Last Name", placeholder: "Enter your last name", required: true },
        { name: "username", label: "Username", placeholder: "Enter your username", required: true },
        { name: "bio", label: "Bio", placeholder: "Tell us about yourself", required: false, type: "textarea" },
        { name: "date_of_birth", label: "Date of Birth", placeholder: "Select your date of birth", required: false, type: "date" },
        { name: "gender", label: "Gender", placeholder: "Enter your gender", required: false },
        { name: "city", label: "City", placeholder: "Enter your city", required: false },
        { name: "state", label: "State/Province", placeholder: "Enter your state or province", required: false },
        { name: "country", label: "Country", placeholder: "Enter your country", required: false },
        { name: "phone", label: "Phone Number", placeholder: "Enter your phone number", required: false, type: "tel" },
        { name: "website", label: "Website", placeholder: "https://yourwebsite.com", required: false, type: "url" },
    ];

    const onSubmit = (data: EditProfile) => {
        const parsedPayload = removeEmptyFields(data);
        updateProfile.mutate(
            { id: user?.id || "", payload: parsedPayload },
            {
                onSuccess: () => {
                    toast.success("Profile updated successfully!");
                    router.push(`/profile/${user?.username}`);
                },
                onError: () => {
                    toast.error("Failed to update profile. Please try again.");
                }
            }
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">Edit Profile</h1>
            </div>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Profile Picture Section */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                {user?.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt="Profile"
                                        width={80}
                                        height={80}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl text-gray-500">
                                        {user?.first_name?.[0] || user?.username?.[0] || 'U'}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Upload a new profile picture (coming soon)
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Change Photo
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
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
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={updateProfile.isPending}
                            className="flex-1 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {updateProfile.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}