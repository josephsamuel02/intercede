import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase-client";
import { showSuccessToast, showWarningToast } from "../../utils/toast-functions";
import { public_routes } from "../../utils/public_routes";
import { LoadingPage } from "../../components/LoadingPage";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the session from the URL hash
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    showWarningToast("Authentication failed. Please try again.");
                    navigate(public_routes.login);
                    return;
                }

                if (data.session) {
                    showSuccessToast("Successfully signed in!");
                    navigate(public_routes.dashboard);
                } else {
                    navigate(public_routes.login);
                }
            } catch (error) {
                console.error("Auth callback error:", error);
                showWarningToast("An error occurred during authentication.");
                navigate(public_routes.login);
            }
        };

        handleCallback();
    }, [navigate]);

    return <LoadingPage />;
};

export default AuthCallback;
