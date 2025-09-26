"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="w-full h-full max-w-3xl max-h-full relative">
         <DotLottieReact
          src="https://lottie.host/3226acff-d71c-4e70-82b3-701a9ae0bcf2/jdrnQ3CHNZ.lottie"
          loop
          autoplay
        />
        <div className="absolute top-1/4 left-1/4 md:top-1/3 md:left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="relative bg-background/80 backdrop-blur-sm text-foreground rounded-lg p-4 shadow-lg max-w-xs">
            <p className="text-lg font-headline font-bold text-center">Hey Scientist !!</p>
            <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-background/80"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
