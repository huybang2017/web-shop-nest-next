import { z } from 'zod'
import { userResponseSchema } from './user-response-schema'
import { tokensResponseSchema } from './tokens-response-schema'

export const loginResponseSchema = z.object({
  statusCode: z.coerce.number(),
  message: z.string(),
  data: z.object({
    user: z.lazy(() => userResponseSchema),
    auth: z.lazy(() => tokensResponseSchema),
  }),
})
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>
