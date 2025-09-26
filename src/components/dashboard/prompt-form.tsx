
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { GenerateDocumentFromPromptInput } from "@/ai/flows/generate-document-from-prompt";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";


const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }).max(500, {
    message: "Prompt cannot be longer than 500 characters."
  }),
  format: z.enum(['PRD', 'Research paper', 'Essay']),
  prdType: z.enum(['Tech', 'Non-Tech']).optional(),
  topicKeywords: z.string().optional(),
  desiredDepth: z.enum(['Quick', 'Standard', 'Deep']),
  targetAudience: z.string().optional(),
  targetLength: z.string().optional(),
  toneStyle: z.enum(['Formal', 'Conversational', 'Academic']),
  referencesStyle: z.literal('No links'),
});

type PromptFormProps = {
  onGenerate: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function PromptForm({ onGenerate, isLoading }: PromptFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      format: "Research paper",
      topicKeywords: "",
      desiredDepth: "Standard",
      targetAudience: "",
      targetLength: "",
      toneStyle: "Formal",
      referencesStyle: 'No links',
    },
  });

  const watchFormat = form.watch("format");

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerate(values);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">New Research</CardTitle>
        <CardDescription>
          Start a new research task by providing a prompt and configuring the options.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <ScrollArea className="flex-1 -mt-6">
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Research Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'The impact of quantum computing on cryptography'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a document format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PRD">PRD</SelectItem>
                          <SelectItem value="Research paper">Research paper</SelectItem>
                          <SelectItem value="Essay">Essay</SelectItem>
                          <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="relative flex w-full cursor-not-allowed select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm opacity-50">
                                    Story mode — In development
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Available Q4 2025</p>
                                </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="desiredDepth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select research depth" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Quick">Quick (summary)</SelectItem>
                          <SelectItem value="Standard">Standard (detailed)</SelectItem>
                          <SelectItem value="Deep">Deep (comprehensive)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchFormat === 'PRD' && (
                <FormField
                  control={form.control}
                  name="prdType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>PRD Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Tech" />
                            </FormControl>
                            <FormLabel className="font-normal">Tech</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Non-Tech" />
                            </FormControl>
                            <FormLabel className="font-normal">Non-Tech</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="toneStyle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tone & Style</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Formal" />
                          </FormControl>
                          <FormLabel className="font-normal">Formal</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Conversational" />
                          </FormControl>
                          <FormLabel className="font-normal">Conversational</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Academic" />
                          </FormControl>
                          <FormLabel className="font-normal">Academic</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible>
                <AccordionItem value="advanced-options">
                  <AccordionTrigger>Advanced Options</AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <FormField
                      control={form.control}
                      name="topicKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., AI, ethics, machine learning" {...field} />
                          </FormControl>
                           <FormDescription>
                            Comma-separated keywords to focus the research.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Technical experts, general public" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="targetLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Length</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 1500 words, 5 pages" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </ScrollArea>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Generating..." : "Generate Document"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
