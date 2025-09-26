"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '../ui/card';

export function CallToActionAnimation() {
  return (
    <section className="container mx-auto pb-16 sm:pb-24">
        <Card className='p-8 flex flex-col items-center gap-6 bg-card/50'>
            <div className='w-full max-w-sm'>
                <DotLottieReact
                src="https://lottie.host/d7115954-8479-4667-ac4d-8aad2aa2d6dd/GrdnroP4FD.lottie"
                loop
                autoplay
                />
            </div>
            <h2 className="text-3xl font-bold font-headline text-center">Ready to Start Your Research?</h2>
            <p className="text-muted-foreground text-center max-w-xl">
                Join Scientisto today and transform your research process. Sign up for free and get your first document in minutes.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Try Scientisto Free</Link>
            </Button>
        </Card>
    </section>
  );
}
