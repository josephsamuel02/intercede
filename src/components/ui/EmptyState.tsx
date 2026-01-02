import React from "react";
import { FiInbox } from "react-icons/fi";

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                {icon || <FiInbox className="w-8 h-8 text-muted-foreground" />}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {description}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};
