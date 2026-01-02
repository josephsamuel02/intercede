import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase-client";
import { showSuccessToast, showWarningToast, showPendingToast } from "../../utils/toast-functions";
import toast from "react-hot-toast";
import { public_routes } from "../../utils/public_routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const pendingToast = showPendingToast("Sending reset link...");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${public_routes.reset_password}`,
    });

    toast.dismiss(pendingToast);

    if (error) {
      showWarningToast(error.message);
    } else {
      showSuccessToast("Password reset link sent to your email!");
      setIsEmailSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>
        {isEmailSent ? (
          <p className="text-center text-gray-700">
            A password reset link has been sent to your email address. Please check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d9932b] hover:bg-[#d9932b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?
          <Link
            to={public_routes.login}
            className="font-medium text-[#d9932b] hover:text-[#d9932b]/90"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
