"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setShowConsent(true);
      }
    } catch (error) {
        // If localStorage is not available (e.g. in SSR or private browsing), we can't store consent.
        // We can choose to not show the banner or handle it differently.
        // For now, we'll just log the error and not show the banner.
        console.error('Could not access localStorage:', error);
    }
  }, []);

  const acceptConsent = () => {
    try {
        localStorage.setItem('cookie_consent', 'true');
        setShowConsent(false);
    } catch (error) {
        console.error('Could not write to localStorage:', error);
        setShowConsent(false); // Hide banner even if storage fails
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="bg-card/80 backdrop-blur-lg border-primary/20 shadow-2xl animate-fade-in-up">
        <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6">
            <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-foreground">
                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
                <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary underline">
                    Learn more in our Privacy Policy.
                </Link>
            </div>
            <Button onClick={acceptConsent} className="w-full sm:w-auto flex-shrink-0">
                Accept
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
