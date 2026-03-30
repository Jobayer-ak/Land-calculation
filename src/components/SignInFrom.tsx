/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/login-form.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validation schema for login step
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Validation schema for OTP step
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

export function SignInForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [resendTimer, setResendTimer] = useState(0);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Handle login submission (Step 1)
  async function onSubmitLogin(data: LoginFormData) {
    setIsLoading(true);
    setError('');

    console.log('🔵 Login attempt for:', data.email);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server error. Please try again.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid email or password');
      }

      console.log('✅ OTP sent to email');
      setUserEmail(data.email);
      setShowOTPInput(true);
      setError('');
      otpForm.reset();

      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error('❌ Login error:', error);

      let errorMessage = error.message;
      if (errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please try again.';
      } else if (errorMessage.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (errorMessage.includes('not activated')) {
        errorMessage = 'Account is not activated. Please contact admin.';
      } else if (errorMessage.includes('locked')) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setShowOTPInput(false);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle OTP verification (Step 2)
  async function onSubmitOTP(data: OTPFormData) {
    setIsLoading(true);
    setError('');

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          otp: data.otp,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server error. Please try again.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid OTP');
      }

      console.log('✅ Login successful:', result);

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      document.cookie = `token=${result.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard/calculator');
      }
    } catch (error: any) {
      console.error('❌ OTP verification error:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Resend OTP
  async function handleResendOTP() {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setError('');

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to resend OTP');
      }

      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setError('');
      console.log('✅ OTP resent successfully');
    } catch (error: any) {
      console.error('❌ Resend error:', error);
      setError(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  }

  // Reset to login form
  const handleBackToLogin = () => {
    setShowOTPInput(false);
    setUserEmail('');
    setError('');
    loginForm.reset();
    otpForm.reset();
  };

  return (
    <Card className="rounded">
      <CardHeader className="space-y-0">
        <CardTitle className="text-2xl text-center font-bold">
          {showOTPInput ? 'Enter Verification Code' : 'Welcome Back'}
        </CardTitle>
        {showOTPInput && (
          <p className="text-sm text-center text-gray-600">
            We've sent a 6-digit code to <strong>{userEmail}</strong>
          </p>
        )}
      </CardHeader>
      <CardContent>
        {!showOTPInput ? (
          // Login Form (Step 1)
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmitLogin)}
              className="space-y-0"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        disabled={isLoading}
                        autoComplete="email"
                        className="h-10 rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium mt-3">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? 'text' : 'password'}
                          disabled={isLoading}
                          autoComplete="current-password"
                          className="h-10 pr-10 rounded"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 font-normal text-sm text-blue-700"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot password?
                </Button>
              </div>

              {error && (
                <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-10 cursor-pointer rounded"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
        ) : (
          // OTP Verification Form (Step 2) - SIMPLIFIED WORKING VERSION
          <div className="space-y-4">
            <div>
              <label className="text-md text-gray-600 font-medium mb-5">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                disabled={isLoading}
                placeholder="Enter 6-digit code"
                className="w-full mt-2 h-12 text-center text-xl tracking-[1rem] font-mono border rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otpForm.watch('otp')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  otpForm.setValue('otp', value);
                  // Trigger validation
                  otpForm.trigger('otp');
                }}
              />
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-600 mt-1">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToLogin}
                disabled={isLoading}
                className="flex-1 rounded cursor-pointer"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={otpForm.handleSubmit(onSubmitOTP)}
                className="flex-1 rounded cursor-pointer"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Login
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0 || isLoading}
                className={`text-sm ${
                  resendTimer > 0 || isLoading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {resendTimer > 0
                  ? `Resend code in ${resendTimer}s`
                  : 'Resend code'}
              </button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="text-blue-700 font-medium hover:underline"
            onClick={onRegisterClick}
          >
            Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
