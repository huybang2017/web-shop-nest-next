import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import {
  PostAuthRefreshErrorResponseSchema,
  PostAuthRefreshRequestSchema,
} from './schemas/post-auth-refresh-response-schema'
import { refreshAccessToken } from './token-manager'
import { useUser } from '@/hook/useDecodeToken'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const apiClient = {
  post: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    const res = client.post<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    )
    return res
  },

  get: <TResponse = unknown, TQueryParams = unknown>(
    url: string,
    params?: TQueryParams,
    config?: AxiosRequestConfig<TQueryParams>,
  ): Promise<AxiosResponse<TResponse, TQueryParams>> => {
    return client.get<TResponse, AxiosResponse<TResponse, TQueryParams>>(url, {
      params,
      ...config,
    })
  },

  put: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    return client.put<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    )
  },
}

client.interceptors.request.use(
  async (config) => {
    const access_token: string = Cookies.get('access_token')
    console.log(access_token)
    if (access_token) {
      const { updateUser } = useUser()
      updateUser()
      const decoded = jwtDecode(access_token)
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        config.headers['Authorization'] = `Bearer ${access_token}`
        return config
      }
    }

    try {
      const newAccessToken = await refreshAccessToken()
      if (newAccessToken) {
        Cookies.set('access_token', newAccessToken, { path: '/' })
        const { updateUser } = useUser()
        updateUser()
        config.headers['Authorization'] = `Bearer ${newAccessToken}`
      }
    } catch (error) {
      if (
        isAxiosError<
          PostAuthRefreshErrorResponseSchema,
          PostAuthRefreshRequestSchema
        >(error)
      ) {
        switch (error.response?.data.statusCode) {
          case 401:

          case 400:
            Cookies.remove('access_token', { path: '/' })
            Cookies.remove('refresh_token', { path: '/' })
            break
          default:
            throw {
              type: 'NetworkError',
              message: 'Failed to connect to the server',
            }
        }
      }
    }

    return config
  },
  null,
  {
    runWhen: (request) => !!!request.headers['No-Auth'],
  },
)

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        throw {
          type: 'NetworkError',
          message: 'Failed to connect to the server',
        }
      }
      throw error.response?.data
    }
    throw {
      type: 'UnknownError',
      message: 'An unknown error occurred',
    }
  },
)
export default client
