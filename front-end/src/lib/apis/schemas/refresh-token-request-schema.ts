import { z } from 'zod'

export const refreshTokenRequestSchema = z.object({
  refresh_token: z.coerce.string().min(1),
})
export type RefreshTokenRequestSchema = z.infer<
  typeof refreshTokenRequestSchema
>
