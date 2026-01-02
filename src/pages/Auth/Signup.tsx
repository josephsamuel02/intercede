import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../lib/supabase-client';
import { showSuccessToast, showWarningToast, showPendingToast } from '../../utils/toast-functions';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { public_routes } from '../../utils/public_routes';
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
import { PasswordStrength } from "../../components/ui/PasswordStrength";
import { GoogleButton } from "../../components/ui/GoogleButton";

const Signup: React.FC = () => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsMatch = password === confirmPassword && confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showWarningToast("Passwords do not match!");
      return;
    }
    setLoading(true);
    const pendingToast = showPendingToast('Signing up...');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
        },
      },
    });
    toast.dismiss(pendingToast);
    if (error) {
      showWarningToast(error.message);
    } else {
      showSuccessToast('Signup successful! Please check your email to verify your account.');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
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
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

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
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join our community of intercessors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Sign Up Button */}
            <GoogleButton
              onClick={handleGoogleSignUp}
              isLoading={googleLoading}
              variant="signup"
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

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label="Surname"
                placeholder="Doe"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                showClearButton
                onClear={() => setSurname('')}
                required
              />
              <Input
                type="text"
                label="Name"
                placeholder="John"
                value={name}
                onChange={(e) => setName(e.target.value)}
                showClearButton
                onClear={() => setName('')}
                required
              />
            </div>

            <Input
              type="email"
              label="Email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showClearButton
              onClear={() => setEmail('')}
              required
            />

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword && !passwordsMatch ? "Passwords do not match" : undefined}
                success={passwordsMatch ? "Passwords match" : undefined}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!passwordsMatch || loading}
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to={public_routes.login} className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
