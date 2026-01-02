import * as React from "react";
import { cn } from "../../lib/utils";
import { FiX, FiCheck, FiAlertCircle } from "react-icons/fi";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
    showClearButton?: boolean;
    onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, success, showClearButton, onClear, value, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);
        const hasValue = value !== undefined && value !== "";

        return (
            <div className="relative w-full">
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm shadow-sm transition-all duration-200",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "placeholder:text-muted-foreground",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-destructive focus-visible:ring-destructive",
                            success && "border-green-500 focus-visible:ring-green-500",
                            !error && !success && "border-input",
                            label && "pt-6 pb-2",
                            className
                        )}
                        ref={ref}
                        value={value}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...props}
                    />

                    {/* Floating Label */}
                    {label && (
                        <label
                            className={cn(
                                "absolute left-3 transition-all duration-200 pointer-events-none",
                                "text-muted-foreground",
                                isFocused || hasValue
                                    ? "top-1.5 text-xs font-medium"
                                    : "top-1/2 -translate-y-1/2 text-sm",
                                error && "text-destructive",
                                success && "text-green-500"
                            )}
                        >
                            {label}
                        </label>
                    )}

                    {/* Clear Button */}
                    {showClearButton && hasValue && !props.disabled && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    )}

                    {/* Success Icon */}
                    {success && !showClearButton && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <FiCheck className="h-4 w-4" />
                        </div>
                    )}

                    {/* Error Icon */}
                    {error && !showClearButton && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                            <FiAlertCircle className="h-4 w-4" />
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
                        {error}
                    </p>
                )}

                {/* Success Message */}
                {success && (
                    <p className="mt-1.5 text-xs text-green-500 flex items-center gap-1 animate-fade-in">
                        {success}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
