
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, DocumentData } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, History, MoreVertical, Trash2, Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deleteDocument } from '@/app/actions';
import { DocumentPreview } from '@/components/dashboard/document-preview';


type GeneratedDoc = {
  id: string;
  documentName: string;
  documentContent: string;
  format: string;
  timestamp: string;
  promptId: string;
};

function HistorySidebar({ documents, isLoading, onSelect, selectedId, onDeleteRequest }: { documents: GeneratedDoc[] | null, isLoading: boolean, onSelect: (doc: GeneratedDoc) => void, selectedId: string | null, onDeleteRequest: (docId: string) => void }) {
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center p-8">
        <History className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No History Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your generated documents will appear here.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-2">
        {documents.map(doc => (
          <div
            key={doc.id}
            onClick={() => onSelect(doc)}
            className={cn(
              "group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors",
              selectedId === doc.id ? "bg-accent" : "hover:bg-muted"
            )}
          >
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium">{doc.documentName}</p>
              <p className="text-xs text-muted-foreground">
                {format(parseISO(doc.timestamp), "MMM d, yyyy")} &middot; {doc.format}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDeleteRequest(doc.id) }}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default function HistoryPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [selectedDoc, setSelectedDoc] = useState<GeneratedDoc | null>(null);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);

  const docsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'generatedDocuments'),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, user]);

  const { data: documents, isLoading, error } = useCollection<GeneratedDoc>(docsQuery);

  useEffect(() => {
    if (!selectedDoc && documents && documents.length > 0) {
      setSelectedDoc(documents[0]);
    }
     if (selectedDoc && documents) {
      const stillExists = documents.find(d => d.id === selectedDoc.id);
      if (!stillExists && documents.length > 0) {
        setSelectedDoc(documents[0]);
      } else if (!stillExists && documents.length === 0) {
        setSelectedDoc(null);
      }
    }
  }, [documents, selectedDoc]);

  const handleDeleteRequest = (docId: string) => {
    setDocToDelete(docId);
  };

  const confirmDelete = async () => {
    if (!docToDelete || !user) return;
    
    const result = await deleteDocument(user.uid, docToDelete);

    if (result.success) {
      toast({
        title: "Document Deleted",
        description: "The document has been removed from your history.",
      });
      if (selectedDoc?.id === docToDelete) {
        setSelectedDoc(null);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: result.error,
      });
    }
    setDocToDelete(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Research History</h1>
        <p className="text-muted-foreground">
          Browse, view, and manage your previously generated documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 min-h-0">
        <Card className="md:col-span-1 flex flex-col">
           <HistorySidebar 
             documents={documents} 
             isLoading={isLoading} 
             onSelect={setSelectedDoc} 
             selectedId={selectedDoc?.id || null}
             onDeleteRequest={handleDeleteRequest}
            />
        </Card>
        <Card className="md:col-span-3 flex flex-col h-full">
            {error && (
                <div className="m-auto text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <p>Could not load history: {error.message}</p>
                </div>
            )}
            {!error && selectedDoc && (
                <>
                <CardHeader>
                    <CardTitle className="truncate font-headline">{selectedDoc.documentName}</CardTitle>
                    <CardDescription>Generated on {format(parseISO(selectedDoc.timestamp), "PPP p")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full rounded-md border p-1">
                        <div className="p-4 sm:p-6">
                            <div className="prose prose-sm max-w-none whitespace-pre-wrap">{selectedDoc.documentContent}</div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    {/* Placeholder for export functionality */}
                </CardFooter>
                </>
            )}
             {!error && !isLoading && !selectedDoc && (
                <div className="m-auto text-center p-8">
                    <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">Select a document</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Choose a document from the list to view its content.
                    </p>
                </div>
            )}
        </Card>
      </div>

      <AlertDialog open={!!docToDelete} onOpenChange={(open) => !open && setDocToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
