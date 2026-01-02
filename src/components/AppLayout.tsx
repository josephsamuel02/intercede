import DashboardSidebar from "../pages/Dashboard/components/DashboardSidebar";
import UpdateSidebar from "../pages/Dashboard/components/UpdateSidebar";
import BottomNav from "../pages/Dashboard/components/BottomNav";
import MobileTopNav from "../pages/Dashboard/components/MobileTopNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Mobile Top Nav */}
      <MobileTopNav />

      {/* Desktop Sidebar */}
      <DashboardSidebar />

      <main className="flex-1 border-r border-border overflow-y-auto">
        {children}
      </main>
      <UpdateSidebar />

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;
