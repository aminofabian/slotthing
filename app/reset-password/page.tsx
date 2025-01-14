'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleResetPassword = async (password: string, confirmPassword: string) => {
    // TODO: Implement actual password reset logic using the token
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  };

  if (!token) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#FFB000]/20" />
        <div className="relative text-center px-4">
          <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Invalid Quest Link!
            </h2>
            <p className="text-[#FFCF9D]/60 mb-6">
              This recovery link has expired or is invalid. Please request a new one to continue your journey.
            </p>
            <a
              href="/forgot-password"
              className="inline-block py-3 px-6 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                     text-black font-semibold rounded-lg transition-all duration-200
                     hover:shadow-lg hover:shadow-[#FFB000]/20"
            >
              Request New Link
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#FFB000]/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFB000]/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md px-4">
        <ResetPasswordForm onSubmit={handleResetPassword} />
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 200 - 100}px, -1000px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-[#FFB000]">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
