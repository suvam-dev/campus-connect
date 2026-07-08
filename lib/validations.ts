import { z } from 'zod';

// ─── Event Schemas ───

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  venue: z.string().min(1, 'Venue is required').max(200, 'Venue is too long'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().max(5000).optional().default(''),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  tags: z.array(z.string().max(50)).max(10).optional().default([]),
  status: z.enum(['draft', 'published', 'cancelled']).optional().default('published'),
  capacity: z.number().int().min(0, 'Capacity must be 0 or more').optional(),
  registrationDeadline: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;

// ─── Notice Schemas ───

export const createNoticeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required').max(10000),
  source: z.string().min(1, 'Source is required'),
  isUnread: z.boolean().optional().default(false),
  tags: z.array(z.string().max(50)).max(10).optional().default([]),
  iconType: z.string().max(50).optional().default('FileText'),
});

export const updateNoticeSchema = createNoticeSchema.partial();

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>;
