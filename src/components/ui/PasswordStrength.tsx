import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface PasswordStrengthProps {
    password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const requirements = [
        { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
        { label: "Contains uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
        { label: "Contains lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
        { label: "Contains number", test: (pwd: string) => /[0-9]/.test(pwd) },
        { label: "Contains special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    ];

    const passedRequirements = requirements.filter(req => req.test(password)).length;
    const strength = passedRequirements === 0 ? 0 : (passedRequirements / requirements.length) * 100;

    const getStrengthColor = () => {
        if (strength === 0) return "bg-gray-200 dark:bg-gray-700";
        if (strength < 40) return "bg-red-500";
        if (strength < 60) return "bg-orange-500";
        if (strength < 80) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthLabel = () => {
        if (strength === 0) return "";
        if (strength < 40) return "Weak";
        if (strength < 60) return "Fair";
        if (strength < 80) return "Good";
        return "Strong";
    };

    if (!password) return null;

    return (
        <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Password strength</span>
                <span className={`text-xs font-medium ${strength < 40 ? "text-red-500" :
                        strength < 60 ? "text-orange-500" :
                            strength < 80 ? "text-yellow-500" :
                                "text-green-500"
                    }`}>
                    {getStrengthLabel()}
                </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${strength}%` }}
                />
            </div>
            <ul className="space-y-1 mt-2">
                {requirements.map((req, index) => {
                    const passed = req.test(password);
                    return (
                        <li
                            key={index}
                            className={`flex items-center gap-2 text-xs transition-colors ${passed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                                }`}
                        >
                            {passed ? (
                                <FiCheck className="h-3 w-3" />
                            ) : (
                                <FiX className="h-3 w-3" />
                            )}
                            {req.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
