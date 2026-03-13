import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = ++idCounter;
    const payload = {
      id,
      type: toast.type || 'info',
      message: toast.message || '',
      duration: toast.duration || 2500
    };

    setToasts((current) => [...current, payload]);

    if (payload.duration > 0) {
      setTimeout(() => removeToast(id), payload.duration);
    }
  }, [removeToast]);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast
    }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return ctx;
}

