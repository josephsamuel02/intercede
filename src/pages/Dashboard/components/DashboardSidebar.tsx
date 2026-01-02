import { useState } from "react";
import {
  UserGroupIcon,
  UsersIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import supabase from "../../../lib/supabase-client";
import { showSuccessToast } from "../../../utils/toast-functions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { public_routes } from "../../../utils/public_routes";
import { useTheme } from "../../../context/ThemeContext";
import { cn } from "../../../lib/utils";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const [isIntercessorsOpen, setIsIntercessorsOpen] = useState(false);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccessToast("Logged out successfully");
    navigate(public_routes.login);
  };

  const menuItems = [
    { text: "Notifications", path: public_routes.notifications, icon: BellIcon },
    { text: "Messages", path: public_routes.messages, icon: ChatBubbleLeftRightIcon },
    { text: "Channels", path: public_routes.channels, icon: GlobeAltIcon },
    { text: "Live Events", path: public_routes.live_events, icon: VideoCameraIcon },
    { text: "Account", path: public_routes.account, icon: UserCircleIcon },
    { text: "Settings", path: public_routes.settings, icon: Cog6ToothIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-white/10 flex flex-col transition-all duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/image/Intercede Logo.png"
              alt="Intercede Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-semibold tracking-tight text-foreground">Intercede</span>
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="md:hidden p-1 hover:bg-accent rounded-md transition-colors">
            <XMarkIcon className="h-6 w-6 text-foreground" />
          </button>
        </div>
        <nav className="flex-1 px-4 mt-4 overflow-y-auto scrollbar-thin">
          <ul className="space-y-1">
            {/* Dashboard - First Item */}
            <li>
              <Link
                to={public_routes.dashboard}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg transition-all relative group",
                  isActive(public_routes.dashboard)
                    ? "font-medium bg-primary/10 text-primary"
                    : "font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 hover:text-foreground"
                )}
              >
                {isActive(public_routes.dashboard) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full animate-scale-in" />
                )}
                <HomeIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm">Dashboard</span>
              </Link>
            </li>

            {/* Intercessors Group Accordion */}
            <li>
              <button
                type="button"
                onClick={() => setIsIntercessorsOpen((prev) => !prev)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-left font-medium text-muted-foreground hover:text-foreground group"
              >
                <UserGroupIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm">Intercessors Group</span>
                {isIntercessorsOpen ? (
                  <ChevronUpIcon className="ml-auto h-4 w-4 transition-transform" />
                ) : (
                  <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform" />
                )}
              </button>
              {isIntercessorsOpen && (
                <ul className="mt-1 ml-6 space-y-1 border-l border-gray-200 dark:border-white/10 pl-2 animate-fade-in">
                  <li>
                    <Link
                      to={public_routes.dashboard_groups}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <UsersIcon className="h-4 w-4" />
                      <span>Prayer Groups</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={public_routes.dashboard}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <UsersIcon className="h-4 w-4" />
                      <span>Local Prayer Group</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={public_routes.dashboard_my_team}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <UsersIcon className="h-4 w-4" />
                      <span>Shadow Prayer Meeting</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Other menu items */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-lg transition-all relative group",
                      isActive(item.path)
                        ? "font-medium bg-primary/10 text-primary"
                        : "font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {isActive(item.path) && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full animate-scale-in" />
                    )}
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span className="text-sm">{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-2">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all w-full text-muted-foreground hover:text-foreground group"
          >
            {mode === "dark" ? (
              <SunIcon className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
            ) : (
              <MoonIcon className="h-5 w-5 transition-transform group-hover:-rotate-12 duration-300" />
            )}
            <span className="text-sm">{mode === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all w-full text-muted-foreground group"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            <span className="text-sm">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
