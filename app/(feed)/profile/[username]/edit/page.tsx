"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema, EditProfile } from "@/src/schema";
import FormInput from "@/components/form-input/FormInput";
import { MediaUpload } from "@/components/media/MediaUpload";
import useUserStore from "@/src/stores/userStore";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { removeEmptyFields } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowLeft, Save, User, MapPin, Globe, Phone, Calendar, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { validateProfile } from "@/lib/profileValidation";
import { toast } from "sonner";
import { useState } from "react";

export default function EditProfilePage() {
    const { user } = useUserStore();
    const updateProfile = useUpdateProfile();
    const router = useRouter();
    const [isMediaUploadDisabled] = useState(true); // Will be enabled when bucket is configured

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

    // Form field configurations
    const personalFields = [
        { name: "first_name", label: "First Name", placeholder: "Enter your first name", required: true, type: "text", icon: User },
        { name: "last_name", label: "Last Name", placeholder: "Enter your last name", required: true, type: "text", icon: User },
        { name: "username", label: "Username", placeholder: "Enter your username", required: true, type: "text", icon: User },
        { name: "bio", label: "Bio", placeholder: "Tell us about yourself (max 160 characters)", required: false, type: "textarea", maxLength: 160 },
        { name: "date_of_birth", label: "Date of Birth", placeholder: "Select your date of birth", required: false, type: "date", icon: Calendar },
        { name: "gender", label: "Gender", placeholder: "Enter your gender", required: false, type: "text" },
    ];

    const contactFields = [
        { name: "phone", label: "Phone Number", placeholder: "Enter your phone number", required: false, type: "tel", icon: Phone },
        { name: "website", label: "Website", placeholder: "https://yourwebsite.com", required: false, type: "url", icon: Globe },
    ];

    const locationFields = [
        { name: "city", label: "City", placeholder: "Enter your city", required: false, type: "text", icon: MapPin },
        { name: "state", label: "State/Province", placeholder: "Enter your state or province", required: false, type: "text", icon: MapPin },
        { name: "country", label: "Country", placeholder: "Enter your country", required: false, type: "text", icon: MapPin },
    ];

    const onSubmit = (data: EditProfile) => {
        console.log("Form submission data:", data);

        try {
            // Client-side validation
            const validation = validateProfile(data);
            if (!validation.isValid) {
                // Show validation errors
                Object.entries(validation.fieldErrors).forEach(([field, errors]) => {
                    errors.forEach(error => {
                        toast.error(`${field}: ${error}`);
                    });
                });
                return;
            }

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
                    onError: (error: any) => {
                        console.error("Profile update error:", error);

                        // Handle specific error types
                        if (error.message?.includes('username')) {
                            toast.error("Username is already taken. Please choose a different one.");
                        } else if (error.message?.includes('validation')) {
                            toast.error("Please check your input and try again.");
                        } else {
                            toast.error("Failed to update profile. Please try again.");
                        }
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
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                    <p className="text-gray-600">Update your profile information and media</p>
                </div>
            </div>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Profile Media Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Camera className="w-5 h-5" />
                                Profile Media
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Cover Photo */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Cover Photo</h3>
                                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                                    {form.watch("cover") ? (
                                        <Image
                                            src={form.watch("cover") || ""}
                                            alt="Cover"
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-white text-lg">No cover photo</span>
                                        </div>
                                    )}
                                </div>
                                <MediaUpload
                                    value={form.watch("cover") || undefined}
                                    onChange={(url) => form.setValue("cover", url)}
                                    onRemove={() => form.setValue("cover", "")}
                                    disabled={isMediaUploadDisabled}
                                    type="cover"
                                />
                            </div>

                            <Separator />

                            {/* Avatar */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Profile Picture</h3>
                                <div className="flex items-center gap-6">
                                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative">
                                        {form.watch("avatar") ? (
                                            <Image
                                                src={form.watch("avatar") || ""}
                                                alt="Profile"
                                                fill
                                                className="object-cover rounded-full"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <span className="text-3xl text-gray-500">
                                                {user?.first_name?.[0] || user?.username?.[0] || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <MediaUpload
                                            value={form.watch("avatar") || undefined}
                                            onChange={(url) => form.setValue("avatar", url)}
                                            onRemove={() => form.setValue("avatar", "")}
                                            disabled={isMediaUploadDisabled}
                                            type="avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {personalFields.map((field) => (
                                    <div key={field.name} className={field.name === 'bio' ? 'md:col-span-2' : ''}>
                                        <FormInput
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            type={field.type}
                                            maxLength={field.maxLength}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {contactFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        type={field.type}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {locationFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        type={field.type}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex gap-3">
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
                        </CardContent>
                    </Card>
                </form>
            </FormProvider>
        </div>
    );
}