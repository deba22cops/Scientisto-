
'use client';

import { useUser, useAuth } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Function to generate a simple hash code from a string
const getHashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// Function to generate a color from a string
const stringToColor = (str: string) => {
  const hash = getHashCode(str);
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const fallbackColor = user?.email ? stringToColor(user.email) : '#cccccc';

  const handleProfileUpdate = async () => {
    if (!user) return;
    setIsUpdating(true);

    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        toast({ title: "Success", description: "Your name has been updated." });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Error", description: `Failed to update name: ${error.message}` });
    }

    setIsUpdating(false);
  };

  const handleSensitiveUpdate = async (updateAction: () => Promise<void>) => {
    if (!user || !user.email || !currentPassword) {
        toast({ variant: 'destructive', title: "Error", description: "Please enter your current password to make sensitive changes." });
        return;
    }
    setIsUpdating(true);
    
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
        await reauthenticateWithCredential(user, credential);
        await updateAction();
    } catch (error: any) {
        toast({ variant: 'destructive', title: "Authentication Failed", description: "Incorrect password. Please try again." });
    } finally {
        setIsUpdating(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }
  };

  const handleEmailUpdate = () => {
    if (!user) return;
     handleSensitiveUpdate(async () => {
        await updateEmail(user, email);
        toast({ title: "Success", description: "Your email has been updated. Please check your new email for verification." });
     });
  };

  const handlePasswordUpdate = () => {
    if (!user) return;
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: "Error", description: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
        toast({ variant: 'destructive', title: "Error", description: "Password must be at least 6 characters long." });
        return;
    }
    handleSensitiveUpdate(async () => {
        await updatePassword(user, newPassword);
        toast({ title: "Success", description: "Your password has been updated." });
    });
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, email, password, and other account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {isUserLoading ? (
              <Skeleton className="h-20 w-20 rounded-full" />
            ) : (
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                <AvatarFallback style={{ backgroundColor: fallbackColor, fontSize: '2rem' }}>
                  {getInitials(user?.displayName)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isUserLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input id="name" defaultValue={user?.displayName || ''} onChange={(e) => setDisplayName(e.target.value)} disabled={isUpdating} />
            )}
          </div>
          <Button onClick={handleProfileUpdate} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Name'}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Email Address</CardTitle>
            <CardDescription>Change the email address associated with your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isUserLoading ? <Skeleton className="h-10 w-full" /> : <Input id="email" type="email" defaultValue={user?.email || ''} onChange={(e) => setEmail(e.target.value)} disabled={isUpdating} />}
            </div>
            <div className="space-y-2">
                <Label htmlFor="currentPasswordEmail">Current Password</Label>
                <Input id="currentPasswordEmail" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password to change email" disabled={isUpdating} />
            </div>
            <Button onClick={handleEmailUpdate} disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update Email'}</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" disabled={isUpdating}/>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={isUpdating}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isUpdating}/>
                </div>
            </div>
            <Button onClick={handlePasswordUpdate} disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update Password'}</Button>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle>Phone Number</CardTitle>
            <CardDescription>Add a phone number for account recovery (Coming Soon).</CardDescription>
        </CardHeader>
        <CardContent className='opacity-50'>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" disabled />
            </div>
            <Button disabled className="mt-4">Add Phone Number</Button>
        </CardContent>
      </Card>

    </div>
  );
}
