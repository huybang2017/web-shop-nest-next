import { apiClient } from '../client'
import { AxiosRequestConfig } from 'axios'
import {
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from '../schemas/post-auth-login-schema'

export async function postAuthLogin(
  data: PostAuthLoginRequestSchema,
  config?: AxiosRequestConfig<PostAuthLoginRequestSchema>,
): Promise<PostAuthLoginResponseSchema> {
  try {
    const response = await apiClient.post<
      PostAuthLoginResponseSchema,
      PostAuthLoginRequestSchema
    >('/auth/login-user', data, {
      headers: {
        'Content-Type': 'application/json',
        'No-Auth': true,
      },
      ...config,
    })

    return response.data
  } catch (error) {
    console.error('Login request failed:', error)
    throw error
  }
}
