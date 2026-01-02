import { BellIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { public_routes } from "../../../utils/public_routes";

const MobileTopNav = () => {
    return (
        <div className="md:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img
                    src="/image/logo.png"
                    alt="Intercede Logo"
                    className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold text-primary">Intercede</span>
            </div>
            <div className="flex items-center gap-4">
                <Link to={public_routes.notifications} className="text-muted-foreground hover:text-foreground transition-colors">
                    <BellIcon className="h-6 w-6" />
                </Link>
                <Link to={public_routes.messages} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </Link>
            </div>
        </div>
    );
};

export default MobileTopNav;
