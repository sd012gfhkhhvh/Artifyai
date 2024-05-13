'use client';

//modules
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

//components
import { Button } from '@/components/ui/button';
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

//zod schema
import { TransformationFormSchema } from '@/lib/zod/schema';

//types
import { TransformationFormSchemaTypes } from '@/lib/zod/schema';

const TransformationForm = ({
  action,
  userId,
  type,
  creditBalance,
  data,
  config,
}: TransformationFormProps) => {
  // 1. Define your form.
  const form = useForm<TransformationFormSchemaTypes>({
    resolver: zodResolver(TransformationFormSchema),
    defaultValues: {
      title: '',
      aspectRatio: '',
      color: '',
      prompt: '',
      publicId: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: TransformationFormSchemaTypes) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default TransformationForm;
