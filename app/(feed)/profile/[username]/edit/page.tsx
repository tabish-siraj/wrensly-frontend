"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema, EditProfile } from "@/src/schema";
import FormInput from "@/components/form-input/FormInput";
import { MediaUpload } from "@/components/media/MediaUpload";
import { SelectField } from "@/components/ui/select-field";
import { PhoneInput } from "@/components/ui/phone-input";
import useUserStore from "@/src/stores/userStore";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { removeEmptyFields } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowLeft, Save, User, MapPin, Globe, Phone, Calendar, Camera, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
    GENDER_OPTIONS,
    COUNTRIES,
    getStatesForCountry,
    getCitiesForState
} from "@/lib/locationData";

export default function EditProfilePage() {
    const { user } = useUserStore();
    const updateProfile = useUpdateProfile();
    const router = useRouter();
    const [isMediaUploadDisabled] = useState(true); // Will be enabled when bucket is configured

    // Location state management
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [availableStates, setAvailableStates] = useState<string[]>([]);
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const date_of_birth = user?.date_of_birth ? new Date(user.date_of_birth).toISOString().split("T")[0] : "";

    const form = useForm<EditProfile>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
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

    // Initialize location dropdowns based on user's current data
    useEffect(() => {
        if (user?.country) {
            setSelectedCountry(user.country);
            const states = getStatesForCountry(user.country);
            setAvailableStates(states);

            if (user?.state) {
                setSelectedState(user.state);
                const cities = getCitiesForState(user.country, user.state);
                setAvailableCities(cities);
            }
        }
    }, [user]);

    // Handle country change
    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        setSelectedState("");
        form.setValue("country", country);
        form.setValue("state", "");
        form.setValue("city", "");

        const states = getStatesForCountry(country);
        setAvailableStates(states);
        setAvailableCities([]);
    };

    // Handle state change
    const handleStateChange = (state: string) => {
        setSelectedState(state);
        form.setValue("state", state);
        form.setValue("city", "");

        const cities = getCitiesForState(selectedCountry, state);
        setAvailableCities(cities);
    };

    // Handle city change
    const handleCityChange = (city: string) => {
        form.setValue("city", city);
    };

    const onSubmit = (data: EditProfile) => {
        try {
            // Remove empty fields and prepare payload
            const parsedPayload = removeEmptyFields(data);

            if (!user?.id) {
                toast.error("User not found. Please log in again.");
                return;
            }

            updateProfile.mutate(
                { id: user.id, payload: parsedPayload },
                {
                    onSuccess: (response) => {
                        toast.success("Profile updated successfully!");
                        router.push(`/profile/${user.username}`);
                    },
                    onError: (error: any) => {
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

    const countryOptions = COUNTRIES.map(country => ({
        value: country,
        label: country
    }));

    const stateOptions = availableStates.map(state => ({
        value: state,
        label: state
    }));

    const cityOptions = availableCities.map(city => ({
        value: city,
        label: city
    }));

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
                                {/* Username - Read Only */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                        <Lock className="w-4 h-4 inline ml-1 text-gray-400" />
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 flex items-center gap-2">
                                        <span>@{user.username}</span>
                                        <span className="text-xs text-gray-400">(Cannot be changed)</span>
                                    </div>
                                </div>

                                {/* First Name */}
                                <FormInput
                                    name="first_name"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    type="text"
                                />

                                {/* Last Name */}
                                <FormInput
                                    name="last_name"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    type="text"
                                />

                                {/* Date of Birth */}
                                <FormInput
                                    name="date_of_birth"
                                    label="Date of Birth"
                                    placeholder="Select your date of birth"
                                    type="date"
                                />

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <SelectField
                                        options={GENDER_OPTIONS}
                                        value={form.watch("gender") || ""}
                                        onChange={(value) => form.setValue("gender", value)}
                                        placeholder="Select your gender"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="md:col-span-2">
                                    <FormInput
                                        name="bio"
                                        label="Bio"
                                        placeholder="Tell us about yourself (max 160 characters)"
                                        type="textarea"
                                        maxLength={160}
                                    />
                                </div>
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
                                {/* Phone Number with Country Code */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        value={form.watch("phone") || ""}
                                        onChange={(value) => form.setValue("phone", value)}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Website */}
                                <div className="md:col-span-2">
                                    <FormInput
                                        name="website"
                                        label="Website"
                                        placeholder="https://yourwebsite.com"
                                        type="url"
                                    />
                                </div>
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
                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <SelectField
                                        options={countryOptions}
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                        placeholder="Select your country"
                                    />
                                </div>

                                {/* State/Province */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State/Province
                                    </label>
                                    <SelectField
                                        options={stateOptions}
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        placeholder="Select your state"
                                        disabled={!selectedCountry || availableStates.length === 0}
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <SelectField
                                        options={cityOptions}
                                        value={form.watch("city") || ""}
                                        onChange={handleCityChange}
                                        placeholder="Select your city"
                                        disabled={!selectedState || availableCities.length === 0}
                                    />
                                </div>
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