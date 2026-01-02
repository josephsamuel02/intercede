import React from "react";

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div
            className={`animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:1000px_100%] rounded-md ${className}`}
        />
    );
};

export const PostSkeleton = () => {
    return (
        <div className="p-4 border border-border rounded-2xl space-y-4 animate-fade-in">
            <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="flex gap-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="p-6 border border-border rounded-2xl space-y-4 animate-fade-in">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
        </div>
    );
};
