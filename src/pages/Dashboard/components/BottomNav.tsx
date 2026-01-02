import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    HomeIcon,
    UserGroupIcon,
    GlobeAltIcon,
    VideoCameraIcon,
    Bars3Icon,
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    SunIcon,
    MoonIcon
} from "@heroicons/react/24/outline";
import { public_routes } from "../../../utils/public_routes";
import { useTheme } from "../../../context/ThemeContext";
import supabase from "../../../lib/supabase-client";
import { showSuccessToast } from "../../../utils/toast-functions";
import { cn } from "../../../lib/utils";
import { Modal } from "../../../components/ui/Modal";

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        showSuccessToast("Logged out successfully");
        navigate(public_routes.login);
    };

    const navItems = [
        { text: "Home", path: public_routes.dashboard, icon: HomeIcon },
        { text: "Groups", path: public_routes.dashboard_groups, icon: UserGroupIcon },
        { text: "Channels", path: public_routes.channels, icon: GlobeAltIcon },
        { text: "Events", path: public_routes.live_events, icon: VideoCameraIcon },
    ];

    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 shadow-lg">
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.text}
                                to={item.path}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-all",
                                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {active && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full animate-scale-in" />
                                )}
                                <Icon className={cn(
                                    "h-6 w-6 transition-transform",
                                    active && "scale-110"
                                )} />
                                <span className={cn(
                                    "text-[10px] font-medium transition-all",
                                    active && "font-semibold"
                                )}>{item.text}</span>
                            </Link>
                        );
                    })}

                    {/* More Button */}
                    <button
                        onClick={() => setIsMoreOpen(true)}
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-foreground transition-all active:scale-95"
                    >
                        <Bars3Icon className="h-6 w-6" />
                        <span className="text-[10px] font-medium">More</span>
                    </button>
                </div>
            </div>

            {/* More Options Modal/Drawer */}
            <Modal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} title="Menu" size="sm">
                <div className="space-y-2">
                    <Link
                        to={public_routes.account}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all text-foreground group"
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <UserCircleIcon className="h-6 w-6 text-muted-foreground group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Account</span>
                    </Link>
                    <Link
                        to={public_routes.settings}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all text-foreground group"
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Cog6ToothIcon className="h-6 w-6 text-muted-foreground group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Settings</span>
                    </Link>

                    <div className="h-px bg-border my-2" />

                    <button
                        onClick={() => {
                            toggleTheme();
                            setIsMoreOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all w-full text-left text-foreground group"
                    >
                        {mode === "dark" ? (
                            <SunIcon className="h-6 w-6 text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-muted-foreground group-hover:-rotate-12 transition-transform duration-300" />
                        )}
                        <span className="font-medium">{mode === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all w-full text-left group"
                    >
                        <ArrowRightOnRectangleIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        <span className="font-medium">Log out</span>
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default BottomNav;
