import {
  BellIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
  const { mode, toggleTheme } = useTheme();

  const settingsSections = [
    {
      title: "Notifications",
      icon: BellIcon,
      description: "Manage how you receive notifications",
      settings: [
        { label: "Push Notifications", enabled: true },
        { label: "Email Notifications", enabled: true },
        { label: "Prayer Request Alerts", enabled: true },
        { label: "Message Notifications", enabled: false },
      ],
    },
    {
      title: "Privacy",
      icon: ShieldCheckIcon,
      description: "Control your privacy settings",
      settings: [
        { label: "Show Online Status", enabled: true },
        { label: "Allow Direct Messages", enabled: true },
        { label: "Show Profile to Public", enabled: false },
      ],
    },
    {
      title: "Language & Region",
      icon: GlobeAltIcon,
      description: "Set your language and regional preferences",
      settings: [
        { label: "Language", value: "English" },
        { label: "Time Zone", value: "UTC-5 (Eastern)" },
        { label: "Date Format", value: "MM/DD/YYYY" },
      ],
    },
  ];

  return (
    <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            Settings
          </h1>

          {/* Appearance Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <PaintBrushIcon className="h-5 w-5 text-[#e68200]" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Appearance
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize how Intercede looks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Theme
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {mode === "dark" ? "Dark mode is enabled" : "Light mode is enabled"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mode === "dark" ? "bg-[#e68200]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mode === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Other Settings Sections */}
          {settingsSections.map((section) => (
            <div
              key={section.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="h-5 w-5 text-[#e68200]" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.label}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </p>
                    {"enabled" in setting ? (
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.enabled ? "bg-[#e68200]" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Connected Devices */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <DevicePhoneMobileIcon className="h-5 w-5 text-[#e68200]" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Connected Devices
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage devices connected to your account
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Current Device
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Windows • Chrome • Active now
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Settings;

