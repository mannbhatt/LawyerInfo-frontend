"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create a context for the toast
const ToastContext = createContext()

// Toast types
const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
}

// Toast provider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Add a new toast
  const addToast = (message, type = TOAST_TYPES.INFO, duration = 3000) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])
  }

  // Remove a toast by id
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Helper functions for different toast types
  const success = (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration)
  const error = (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration)
  const info = (message, duration) => addToast(message, TOAST_TYPES.INFO, duration)
  const warning = (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration)

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

// Hook to use the toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Toast container component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}

// Individual toast component
function Toast({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, toast.duration)

    return () => clearTimeout(timer)
  }, [toast, removeToast])

  // Determine background color based on toast type
  const getBgColor = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return "bg-green-500"
      case TOAST_TYPES.ERROR:
        return "bg-red-500"
      case TOAST_TYPES.WARNING:
        return "bg-yellow-500"
      case TOAST_TYPES.INFO:
      default:
        return "bg-[#591B0C]"
    }
  }

  return (
    <div
      className={`${getBgColor()} text-white p-4 rounded-md shadow-lg flex justify-between items-center animate-slideIn`}
      role="alert"
    >
      <p>{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  )
}

// Export toast types
export { TOAST_TYPES }

