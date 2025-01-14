'use client';

import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (email: string) => {
    // TODO: Implement actual forgot password logic
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  };

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
        <ForgotPasswordForm onSubmit={handleForgotPassword} />
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
