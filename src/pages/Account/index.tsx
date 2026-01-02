import { useState, useEffect } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import supabase from "../../lib/supabase-client";
import { showSuccessToast, showErrorToast } from "../../utils/toast-functions";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
  } | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || "",
          avatar_url: user.user_metadata?.avatar_url || "",
        });
        setFullName(user.user_metadata?.full_name || "");
        setAvatarUrl(user.user_metadata?.avatar_url || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      },
    });

    if (error) {
      showErrorToast(error.message);
    } else {
      showSuccessToast("Profile updated successfully");
      setUser((prev) => prev ? { ...prev, full_name: fullName, avatar_url: avatarUrl } : null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            Account Settings
          </h1>

          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-[#e68200]" />
              Profile Information
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#e68200] flex items-center justify-center text-white text-2xl font-bold">
                      {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <CameraIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload a new avatar or enter a URL below
                  </p>
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e68200] focus:border-transparent transition-colors"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e68200] focus:border-transparent transition-colors"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Email cannot be changed
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 px-4 bg-[#e68200] hover:bg-[#e68200]/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-2">
              <KeyIcon className="h-5 w-5 text-[#e68200]" />
              Security
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Password</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Change your account password
                  </p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-[#e68200] hover:bg-[#e68200]/10 rounded-lg transition-colors">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-[#e68200] hover:bg-[#e68200]/10 rounded-lg transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Account;

