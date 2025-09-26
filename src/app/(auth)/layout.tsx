"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-background">
      <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-muted/20">
        <div className="w-full max-w-md">
          <DotLottieReact
            src="https://lottie.host/6b961c26-7004-4d33-8514-f27a6cb3bbc9/NutzC0pZjD.lottie"
            loop
            autoplay
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
