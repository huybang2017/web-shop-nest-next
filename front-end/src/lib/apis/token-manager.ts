import { isAxiosError } from 'axios'
import { postAuthRefresh } from './endpoints/post-auth-refresh'
import Cookies from 'js-cookie'

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken() {
  const refresh_token = Cookies.get('refresh_token')

  if (!refresh_token) {
    throw new Error('No refresh token found')
  }

  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    try {
      const data = await postAuthRefresh({ refresh_token })
      if (data.refresh_token !== refresh_token) {
        Cookies.set('refresh_token', data.refresh_token)
      }
      Cookies.set('access_token', data.access_token)
      refreshPromise = null
      return data.access_token
    } catch (error) {
      refreshPromise = null
      if (isAxiosError(error)) {
        throw error
      }
      throw new Error('Failed to refresh access token')
    }
  })()

  return refreshPromise
}
