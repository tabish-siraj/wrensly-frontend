import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white shadow-sm">
            <div className="flex items-start space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
            <div className="flex space-x-6 pt-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
            </div>
        </div>
    );
}

export function PostSkeletonList({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <PostSkeleton key={i} />
            ))}
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="w-full">
            {/* Cover and Avatar */}
            <div className="relative">
                <Skeleton className="w-full h-[200px]" />
                <div className="absolute -bottom-16 left-8">
                    <Skeleton className="w-32 h-32 rounded-full border-4 border-white" />
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 pt-20 pb-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>

                <div className="flex gap-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>
        </div>
    );
}