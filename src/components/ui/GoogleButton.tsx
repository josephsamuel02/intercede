import React from "react";
import { FaGoogle } from "react-icons/fa";
import { cn } from "../../lib/utils";

interface GoogleButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    variant?: "signin" | "signup";
    className?: string;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
    onClick,
    isLoading = false,
    variant = "signin",
    className,
}) => {
    const text = variant === "signin" ? "Sign in with Google" : "Sign up with Google";

    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={cn(
                "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group",
                className
            )}
        >
            {isLoading ? (
                <svg
                    className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            ) : (
                <FaGoogle className="h-5 w-5 text-[#4285F4] group-hover:scale-110 transition-transform" />
            )}
            <span className="text-sm">{isLoading ? "Connecting..." : text}</span>
        </button>
    );
};
