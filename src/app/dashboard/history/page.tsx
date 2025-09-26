
'use client';

import { useCollection, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

type PromptHistoryItem = {
  id: string;
  prompt: string;
  format: string;
  createdAt: string;
};

function HistoryItemSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/5" />
      </div>
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <History className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">No History Yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Your generated documents will appear here once you create them.
      </p>
    </div>
  );
}

export default function HistoryPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const promptsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'prompts'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: prompts, isLoading, error } = useCollection<PromptHistoryItem>(promptsQuery);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Research History</h1>
        <p className="text-muted-foreground">
          A log of all the documents you have generated.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your past prompts are saved here for your reference.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-6">
              <HistoryItemSkeleton />
              <HistoryItemSkeleton />
              <HistoryItemSkeleton />
            </div>
          )}
          
          {!isLoading && error && (
             <div className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <p>Could not load history: {error.message}</p>
            </div>
          )}
          
          {!isLoading && !error && prompts && prompts.length > 0 && (
            <div className="space-y-6">
              {prompts.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium truncate">{item.prompt}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="outline">{item.format}</Badge>
                </div>
              ))}
            </div>
          )}
          {!isLoading && !error && (!prompts || prompts.length === 0) && <EmptyState />}
        </CardContent>
      </Card>
    </div>
  );
}
