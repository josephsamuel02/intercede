import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/Auth/AuthCallback";
import supabase from "./lib/supabase-client";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Channels from "./pages/Channels";
import LiveEvents from "./pages/LiveEvents";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import LoadingPage from "./components/LoadingPage";
import AppLayout from "./components/AppLayout";
import { public_routes } from "./utils/public_routes";
import { type Session } from "@supabase/supabase-js";
import { ToastProvider } from "./components/toasts";

// Protected route wrapper with AppLayout
const ProtectedLayout = ({ session }: { session: Session | null }) => {
  if (!session) {
    return <Navigate to={public_routes.login} replace />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingPage />; // Render LoadingPage if loading is true
  }

  return (
    <div
      className={`min-h-screen text-gray-900 bg-white dark:bg-black dark:text-gray-50 transition-colors`}
    >
      <ToastProvider />
      <BrowserRouter>
        <Routes>
          <Route path={public_routes.landing} element={<Landing />} />

          <Route
            path={public_routes.auth_root}
            element={session ? <Navigate to={public_routes.dashboard} replace /> : <Auth />}
          />

          {/* OAuth Callback Route */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected routes with shared AppLayout */}
          <Route element={<ProtectedLayout session={session} />}>
            <Route path={public_routes.dashboard} element={<Dashboard />} />
            <Route path={public_routes.notifications} element={<Notifications />} />
            <Route path={public_routes.messages} element={<Messages />} />
            <Route path={public_routes.channels} element={<Channels />} />
            <Route path={public_routes.live_events} element={<LiveEvents />} />
            <Route path={public_routes.account} element={<Account />} />
            <Route path={public_routes.settings} element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>


  );
};
export default App;
