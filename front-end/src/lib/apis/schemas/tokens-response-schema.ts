import { z } from 'zod'

export const tokensResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})
export type TokensResponseSchema = z.infer<typeof tokensResponseSchema>
