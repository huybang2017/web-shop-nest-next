import { z } from 'zod'

export const refreshTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})
export type RefreshTokenResponseSchema = z.infer<
  typeof refreshTokenResponseSchema
>
