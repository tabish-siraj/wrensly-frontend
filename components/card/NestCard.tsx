import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Link, Calendar, Cake } from "lucide-react"
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";



export default function ProfileCard() {
    const { user } = useUserStore();
    return (
        <div className="w-1/2 m-auto">
            <div className="w-full max-w-4xl mx-auto">
                {/* div for cover and pfp */}
                <div>
                    <div className="relative w-full h-[200px] bg-gray-200">
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8_W4z4PTHC0ogzdUY3UO9t35bbtSzvxFiA&s" // Replace with your cover image
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="px-4">
                        <div className="relative">
                            <div className="absolute -top-16 left-4">
                                <Avatar className="w-32 h-32 border-4 border-white">
                                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s" alt={user?.username} />
                                    <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
                {/* div for profile info */}
                <div className="pt-10 px-4">
                    <div>
                        <div className="pt-20">
                            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName} </h1>
                            <p className="text-gray-500">@{user?.username}</p>
                        </div>
                        <div className="pt-10">
                            <p className="text-white">@{user?.bio}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex flex-row items-center"><MapPin className="size-4 mr-1" /> {user?.country}</span>
                        <span className="flex flex-row items-center"><Link className="size-4 mr-1" /> {user?.website}</span>
                        <span className="flex flex-row items-center"><Cake className="size-4 mr-1" /> {user?.dateOfBirth ? new Date(user.createdAt).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric"
                        }) : ""}</span>
                        <span className="flex flex-row items-center"><Calendar className="size-4 mr-1" /> Joined on {" "}
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }) : ""}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
