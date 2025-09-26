
'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountPage() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is your public display name.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {isUserLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input id="name" value={user?.displayName || ''} readOnly />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
               {isUserLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input id="email" value={user?.email || ''} readOnly />
              )}
            </div>
            <Button disabled>Update Profile (Coming Soon)</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
