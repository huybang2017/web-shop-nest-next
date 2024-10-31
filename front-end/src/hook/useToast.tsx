'use client'
import React, { createContext, useContext, useState } from 'react'
import Toast from '@/components/toasts/Toast'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string
    type?: ToastType
    duration?: number
  } | null>(null)

  const showToast = (
    message: string,
    type: ToastType = 'info',
    duration: number = 3000,
  ) => {
    setToast({ message, type, duration })

    setTimeout(() => {
      setToast(null) // This will clear the toast after the duration
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children} {/* Render any children passed to the ToastProvider */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)} // Close the toast when onClose is called
        />
      )}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
