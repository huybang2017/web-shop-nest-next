'use client'

import { postAuthLogin } from '@/lib/apis/endpoints/post-auth-login'
import {
  PostAuthLoginErrorResponseSchema,
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from '@/lib/apis/schemas/post-auth-login-schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  loginRequestSchema,
  LoginRequestSchema,
} from '@/lib/apis/schemas/login-request-schema'
import { useToast } from '@/hook/useToast'

const SignInForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showToast } = useToast()

  const loginForm = useForm<LoginRequestSchema>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, register, setError } = loginForm

  const mapFieldErrorToFormError = (
    setError: (name: string, error: { type: string; message: string }) => void,
    errors: Record<string, string[]>,
  ) => {
    for (const [field, messages] of Object.entries(errors)) {
      setError(field, { type: 'manual', message: messages[0] })
    }
  }

  const mutation = useMutation<
    PostAuthLoginResponseSchema,
    PostAuthLoginErrorResponseSchema,
    PostAuthLoginRequestSchema
  >({
    mutationKey: ['login'],
    mutationFn: (data) => postAuthLogin(data),
    onSuccess(data) {
      Cookies.set('refresh_token', data.data.auth.refresh_token, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
      })
      Cookies.set('access_token', data.data.auth.access_token, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
      })

      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })

      showToast('Login successful', 'success')
      router.push('/')
    },
    onError: (error) => {
      showToast('Login failed', 'error')

      if (isAxiosError(error)) {
        if (error.response?.data.error) {
          mapFieldErrorToFormError(setError, error.response.data.error)
        }
      }
    },
    throwOnError: (error) => isAxiosError(error),
  })

  const onSubmit = (values: LoginRequestSchema) => {
    mutation.mutate(values)
  }

  return (
    <div className="col-span-4 flex justify-center items-center">
      <div className="w-4/6">
        <p className="text-4xl my-5">Log in to Exclusives</p>
        <p>Enter your details below</p>
        <form className="space-y-9 py-9" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('email')}
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              {...register('password')}
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-center gap-10">
            <button
              type="submit"
              className="text-white bg-rose-600 py-3 w-full rounded-md text-sm font-bold"
            >
              Log in
            </button>
            <Link
              href="/forget-password"
              className="text-rose-600 bg-white py-3 w-full rounded-md text-sm flex justify-center items-center"
            >
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm
