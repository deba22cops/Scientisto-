
"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        {children}
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-muted/40 p-8 border-l">
        <div className="w-full max-w-md">
          <DotLottieReact
            src="https://lottie.host/6b961c26-7004-4d33-8514-f27a6cb3bbc9/NutzC0pZjD.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
