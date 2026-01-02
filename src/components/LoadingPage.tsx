import { motion } from "framer-motion";
import { useEffect } from "react";

export const LoadingPage = () => {
  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/image/logo.png"
            alt="Intercede Logo"
            className="h-20 w-20 object-contain"
          />
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          className="relative w-16 h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 border-4 border-primary/20 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;
