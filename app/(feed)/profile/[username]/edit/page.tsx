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

    // Debug logging
    console.log("EditProfilePage - Current user:", user);

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
        { name: "first_name", label: "First Name", placeholder: "Enter your first name", required: true, type: "text" },
        { name: "last_name", label: "Last Name", placeholder: "Enter your last name", required: true, type: "text" },
        { name: "username", label: "Username", placeholder: "Enter your username", required: true, type: "text" },
        { name: "bio", label: "Bio", placeholder: "Tell us about yourself (max 160 characters)", required: false, type: "textarea", maxLength: 160 },
        { name: "date_of_birth", label: "Date of Birth", placeholder: "Select your date of birth", required: false, type: "date" },
        { name: "gender", label: "Gender", placeholder: "Enter your gender", required: false, type: "text" },
        { name: "city", label: "City", placeholder: "Enter your city", required: false, type: "text" },
        { name: "state", label: "State/Province", placeholder: "Enter your state or province", required: false, type: "text" },
        { name: "country", label: "Country", placeholder: "Enter your country", required: false, type: "text" },
        { name: "phone", label: "Phone Number", placeholder: "Enter your phone number", required: false, type: "tel" },
        { name: "website", label: "Website", placeholder: "https://yourwebsite.com", required: false, type: "url" },
        { name: "avatar", label: "Avatar URL", placeholder: "https://example.com/avatar.jpg", required: false, type: "url" },
        { name: "cover", label: "Cover Photo URL", placeholder: "https://example.com/cover.jpg", required: false, type: "url" },
    ];

    const onSubmit = (data: EditProfile) => {
        console.log("Form submission data:", data);

        try {
            const parsedPayload = removeEmptyFields(data);
            console.log("Parsed payload:", parsedPayload);

            if (!user?.id) {
                toast.error("User not found. Please log in again.");
                return;
            }

            updateProfile.mutate(
                { id: user.id, payload: parsedPayload },
                {
                    onSuccess: (response) => {
                        console.log("Profile update success:", response);
                        toast.success("Profile updated successfully!");
                        router.push(`/profile/${user.username}`);
                    },
                    onError: (error) => {
                        console.error("Profile update error:", error);
                        toast.error("Failed to update profile. Please try again.");
                    }
                }
            );
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An error occurred while processing your request.");
        }
    };

    // Show loading state if user data is not available
    if (!user) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading user data...</p>
                    </div>
                </div>
            </div>
        );
    }

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
                        <h2 className="text-lg font-semibold mb-4">Profile Images</h2>

                        {/* Avatar */}
                        <div className="mb-6">
                            <h3 className="text-md font-medium mb-2">Profile Picture</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    {(form.watch("avatar") || user?.avatar) ? (
                                        <Image
                                            src={form.watch("avatar") || user?.avatar || ""}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="w-full h-full rounded-full object-cover"
                                            onError={(e) => {
                                                // Hide broken images
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-2xl text-gray-500">
                                            {user?.first_name?.[0] || user?.username?.[0] || 'U'}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Add an avatar URL or upload a new profile picture (upload coming soon)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cover Photo */}
                        <div>
                            <h3 className="text-md font-medium mb-2">Cover Photo</h3>
                            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden mb-2">
                                {(form.watch("cover") || user?.cover) ? (
                                    <Image
                                        src={form.watch("cover") || user?.cover || ""}
                                        alt="Cover"
                                        width={400}
                                        height={128}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Hide broken images
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                        <span className="text-white text-sm">No cover photo</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Add a cover photo URL or upload a new cover (upload coming soon)
                            </p>
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
                                type={field.type}
                                maxLength={field.maxLength}
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