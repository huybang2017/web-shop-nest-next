import React, { useEffect } from 'react'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
  FaExclamationTriangle,
} from 'react-icons/fa' // Thêm các icon cần thiết

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number // in milliseconds
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  }

  const icons = {
    success: <FaCheckCircle className="inline mr-2" />,
    error: <FaExclamationCircle className="inline mr-2" />,
    info: <FaInfoCircle className="inline mr-2" />,
    warning: <FaExclamationTriangle className="inline mr-2" />,
  }

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300 z-50 flex items-center`}
    >
      {icons[type]} {/* Hiển thị icon tương ứng với loại thông báo */}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-lg ml-4">
        <FaTimes />
      </button>{' '}
      {/* Nút đóng */}
    </div>
  )
}

export default Toast
