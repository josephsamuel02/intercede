import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}) => {
    const [show, setShow] = useState(isOpen);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            setShow(true);
            setTimeout(() => setAnimate(true), 10);
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEscape);
        } else {
            setAnimate(false);
            const timer = setTimeout(() => {
                setShow(false);
                document.body.style.overflow = "auto";
            }, 300);
            return () => {
                clearTimeout(timer);
                document.removeEventListener("keydown", handleEscape);
            };
        }

        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!show) return null;

    const sizes = {
        sm: "sm:max-w-md",
        md: "sm:max-w-2xl",
        lg: "sm:max-w-4xl",
        xl: "sm:max-w-6xl",
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4">
            {/* Backdrop with blur */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300",
                    animate ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Content */}
            <div
                className={cn(
                    "relative w-full h-full sm:h-auto bg-background shadow-2xl transition-all duration-300 transform flex flex-col sm:rounded-2xl overflow-hidden border border-border",
                    sizes[size],
                    animate
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-full sm:translate-y-10 opacity-0 sm:scale-95"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10 shrink-0">
                    <h2 className="text-lg sm:text-xl font-semibold">{title || "Details"}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
                        <XMarkIcon className="h-5 w-5" />
                    </Button>
                </div>

                {/* Scrollable Body */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 h-full sm:max-h-[80vh] scrollbar-thin">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
