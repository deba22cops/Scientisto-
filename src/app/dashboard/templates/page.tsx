
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Templates</h1>
        <p className="text-muted-foreground">
          Create and manage your custom document templates. (Coming Soon)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prompt Templates</CardTitle>
          <CardDescription>This feature is currently in development.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Feature Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    This section will allow you to create, edit, and use custom templates for your research.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
