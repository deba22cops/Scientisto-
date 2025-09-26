
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function SavedPromptsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Saved Prompts</h1>
        <p className="text-muted-foreground">
          Your favorite prompts are saved here for quick access. (Coming Soon)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved</CardTitle>
          <CardDescription>This feature is currently in development.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Feature Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    You'll be able to save and manage your favorite prompts from this page.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
