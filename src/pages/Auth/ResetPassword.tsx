import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase-client";
import { showSuccessToast, showWarningToast, showPendingToast } from "../../utils/toast-functions";
import toast from "react-hot-toast";
import { public_routes } from "../../utils/public_routes";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // The session is now available
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showWarningToast("Passwords do not match");
      return;
    }
    setLoading(true);
    const pendingToast = showPendingToast("Resetting password...");

    const { error } = await supabase.auth.updateUser({ password });

    toast.dismiss(pendingToast);

    if (error) {
      showWarningToast(error.message);
    } else {
      showSuccessToast("Password updated successfully!");
      navigate(public_routes.dashboard);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d9932b] hover:bg-[#d9932b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
