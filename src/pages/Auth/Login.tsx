import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase-client";
import { showWarningToast, showPendingToast } from "../../utils/toast-functions";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { public_routes } from "../../utils/public_routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { GoogleButton } from "../../components/ui/GoogleButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const pendingToast = showPendingToast("Logging in...");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    toast.dismiss(pendingToast);
    if (error) {
      showWarningToast(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      showWarningToast(error.message);
      setGoogleLoading(false);
    }
    // Note: Don't set loading to false here as user will be redirected
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-[#0a0a0a] dark:to-black p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md relative z-10 animate-scale-in" variant="elevated">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="/image/logo.png"
              alt="Intercede Logo"
              className="h-12 w-12 object-contain"
            />
            <h2 className="text-xl font-bold tracking-tighter">
              Intercede
            </h2>
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Sign In Button */}
            <GoogleButton
              onClick={handleGoogleSignIn}
              isLoading={googleLoading}
              variant="signin"
            />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <Input
              type="email"
              label="Email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showClearButton
              onClear={() => setEmail("")}
              required
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Password</label>
                <Link
                  to={public_routes.forgot_password}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <p className="w-full text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to={public_routes.signup}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
