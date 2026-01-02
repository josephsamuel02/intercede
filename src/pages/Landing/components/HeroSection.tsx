import { Link } from "react-router-dom";
import { PlayIcon, FireIcon, BoltIcon } from "@heroicons/react/24/solid";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { public_routes } from "../../../utils/public_routes";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#e68200]/20 dark:bg-[#e68200]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-[-100px] w-[300px] h-[300px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-fade-in-up">
          <div className="flex items-center gap-2 text-[#e68200] font-medium">
            <BoltIcon className="w-5 h-5" />
            <span>Stay Connected</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
            Where <br /> Kingdom{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e68200] to-yellow-200">
              Alters
              <FireIcon className="w-10 h-10 inline-block ml-4 text-[#e68200] dark:text-[#e68200] animate-pulse" />
            </span>{" "}
            meet <br />
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            A sacred space where priests and intercessors unite in prayer, share deep insights
            and experience the power of collective intercession.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={public_routes.signup}
              className="px-8 py-4 bg-primary dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl animate-pulse-glow"
            >
              Signup
              <span className="text-lg">↗</span>
            </Link>
            <Link
              to={public_routes.login}
              className="px-8 py-4 rounded-full font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              Login
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-8">
            <button className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] hover:scale-105 transition-all">
              <div className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black">
                <FaApple className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase leading-none">
                  Download on the
                </div>
                <div className="text-sm font-bold leading-none text-gray-900 dark:text-white">
                  App Store
                </div>
              </div>
            </button>
            <button className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] hover:scale-105 transition-all">
              <div className="w-6 h-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded flex items-center justify-center">
                <FaGooglePlay className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase leading-none">
                  Get it on
                </div>
                <div className="text-sm font-bold leading-none text-gray-900 dark:text-white">
                  Google Play
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Hero Image / Visual */}
        <div className="relative h-[500px] w-full lg:w-[90%] lg:ml-auto rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-[#e68200]/10 animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-white/50 dark:via-black/50 to-transparent" />

          {/* Floating Elements */}
          <div className="absolute bottom-8 left-8 right-8 animate-scale-in">
            <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e68200] flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Live Session
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Connecting worlds...
                  </p>
                </div>
                <div className="ml-auto flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-white/10 bg-gray-300 dark:bg-gray-800 overflow-hidden"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${1530000000000 + i}?w=100`}
                        className="w-full h-full object-cover"
                        alt="User"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
