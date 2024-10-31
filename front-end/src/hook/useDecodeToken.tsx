'use client'
import { UserResponseSchema } from '@/lib/apis/schemas/user-response-schema'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  user: UserResponseSchema
  updateUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserResponseSchema>({
    email: '',
    id: -1,
    role: 'user',
  })

  const updateUser = () => {
    const token = Cookies.get('acess_token')
    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        setUser({
          email: decoded.email,
          id: decoded.id,
          role: decoded.role,
        })
      } catch (error) {
        console.error('Invalid token:', error)
        setUser({ email: '', id: -1, role: 'user' })
      }
    } else {
      setUser({ email: '', id: -1, role: 'user' })
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
