'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createBook, updateBook } from '@/lib/db/books';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const bookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  cover: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png, and .webp formats are supported.'
    )
    .optional(),
  description: z.string().min(1, 'Description is required'),
  publishedDate: z.date(),
  purchaseDate: z.date(),
  type: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook']),
  isbn: z.string().optional(),
});

export type BookFormValues = z.infer<typeof bookSchema>;

export default function BookForm({ data }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    data?.cover || null
  );
  const [isCoverSelected, setIsCoverSelected] = useState(false);

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: data?.title || '',
      author: data?.author || '',
      description: data?.description || '',
      type: data?.type || 'hardcover',
      isbn: data?.isbn || '',
      publishedDate: data?.published_date || undefined,
      purchaseDate: data?.purchase_date || undefined,
      id: data?.id || undefined,
    },
  });

  async function onSubmit(data: BookFormValues) {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    console.log(data);
    if (data.id) {
      // Update book
      updateBook(data.id, data);
    } else {
      // Create book
      await createBook(data);
    }
    setIsSubmitting(false);
    form.reset();
    setCoverPreview(null);
    setIsCoverSelected(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="mt-2 rounded-md max-w-[200px] max-h-[300px] object-contain"
                />
              )}
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Input
                    id="cover-upload"
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        setIsCoverSelected(true);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCoverPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    hidden
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      document.getElementById('cover-upload')?.click()
                    }
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  {isCoverSelected && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onChange(undefined);
                        setCoverPreview(null);
                        setIsCoverSelected(false);
                        if (document.getElementById('cover-upload')) {
                          (
                            document.getElementById(
                              'cover-upload'
                            ) as HTMLInputElement
                          ).value = '';
                        }
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </FormControl>

              <FormDescription>
                Upload a cover image (max 5MB, .jpg, .png, or .webp)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter book description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Published Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value && 'text-muted-foreground'
                      }`}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value && 'text-muted-foreground'
                      }`}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hardcover">Hardcover</SelectItem>
                  <SelectItem value="paperback">Paperback</SelectItem>
                  <SelectItem value="ebook">E-book</SelectItem>
                  <SelectItem value="audiobook">Audiobook</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter ISBN" {...field} />
              </FormControl>
              <FormDescription>
                International Standard Book Number (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : data ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
