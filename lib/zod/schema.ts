import { z } from 'zod';

export const TransformationFormSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export type TransformationFormSchemaTypes = z.infer<typeof TransformationFormSchema>