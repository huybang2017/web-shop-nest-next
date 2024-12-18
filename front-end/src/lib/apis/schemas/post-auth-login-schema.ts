import { LoginRequestSchema } from './login-request-schema'
import { LoginResponseSchema } from './login-response-schema'
import { ValidationErrorResponseSchema } from './validate-error-response-schema'

export type PostAuthLoginRequestSchema = LoginRequestSchema
export type PostAuthLoginResponseSchema = LoginResponseSchema
export type PostAuthLoginErrorResponseSchema = ValidationErrorResponseSchema
