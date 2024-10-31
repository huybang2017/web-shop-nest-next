import { z } from 'zod'
import { RefreshTokenRequestSchema } from './refresh-token-request-schema'
import { RefreshTokenResponseSchema } from './refresh-token-response-schema'
import { validationErrorResponseSchema } from './validate-error-response-schema'

export type PostAuthRefreshRequestSchema = RefreshTokenRequestSchema
export type PostAuthRefreshResponseSchema = RefreshTokenResponseSchema

export const postAuthRefreshErrorResponseSchema = validationErrorResponseSchema

export type PostAuthRefreshErrorResponseSchema = z.infer<
  typeof postAuthRefreshErrorResponseSchema
>
