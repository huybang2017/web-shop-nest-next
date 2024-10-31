import { z } from 'zod'

export const userResponseSchema = z.object({
  id: z.coerce.number(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
})
export type UserResponseSchema = z.infer<typeof userResponseSchema>
