import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { public_routes } from "../../../utils/public_routes";
import { useTheme } from "../../../context/ThemeContext";

const LandingNavbar = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-black/50 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-2">
        <img
          src="/image/Intercede Logo.png"
          alt="Intercede Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Intercede</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-white/10 rounded-full p-1 border border-gray-200 dark:border-white/10">
          <button className="px-6 py-2 rounded-full bg-white dark:bg-white/10 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-gray-900 dark:text-white">
            Search
          </button>
          <input
            type="text"
            placeholder="Search"
            className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 bg-transparent border-none outline-none focus:text-gray-900 dark:focus:text-white transition-all"
          />
        </div>

        <div className="hidden md:flex items-center gap-4 ml-4">
          <Link
            to={public_routes.login}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to={public_routes.signup}
            className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
        aria-label="Toggle theme"
      >
        {mode === "dark" ? (
          <SunIcon className="w-5 h-5 text-gray-900 dark:text-yellow-400" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        )}
      </button>
    </nav>
  );
};

export default LandingNavbar;
