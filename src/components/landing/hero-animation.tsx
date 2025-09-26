"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
         <DotLottieReact
          src="https://lottie.host/3226acff-d71c-4e70-82b3-701a9ae0bcf2/jdrnQ3CHNZ.lottie"
          loop
          autoplay
        />
        </div>
        <div className='absolute -top-10 -right-10 w-64 h-64 animate-float'>
          <DotLottieReact
            src="https://lottie.host/6b961c26-7004-4d33-8514-f27a6cb3bbc9/NutzC0pZjD.lottie"
            loop
            autoplay
          />
        </div>
    </div>
  );
}
