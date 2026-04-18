'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSignup } from '@/features/auth/hooks/useSignup';
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password1: z.string().min(6, 'Password must be at least 6 characters'),
  password2: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password1 === data.password2, {
  message: "Passwords don't match",
  path: ['password2'],
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password1: '',
      password2: '',
    },
  });

  const { mutate: signup, isPending } = useSignup();

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="text-blue-600 decoration-2 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border ${
                  errors.name ? 'border-red-500' : ''
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-2">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                {...register('password1')}
                type="password"
                id="password1"
                className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border ${
                  errors.password1 ? 'border-red-500' : ''
                }`}
                placeholder="********"
              />
              {errors.password1 && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.password1.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                {...register('password2')}
                type="password"
                id="password2"
                className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border ${
                  errors.password2 ? 'border-red-500' : ''
                }`}
                placeholder="********"
              />
              {errors.password2 && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.password2.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {isPending ? (
                <>
                  <span
                    className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  ></span>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="py-6 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
