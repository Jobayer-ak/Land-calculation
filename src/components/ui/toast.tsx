/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number,
  ) => void;
}

// Toast Item Component
const ToastItem = ({
  id,
  type,
  title,
  message,
  duration = 3000,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-white" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-white" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-gray-700" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'warning':
        return 'bg-yellow-400';
      case 'info':
        return 'bg-blue-50';
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-white';
      case 'error':
        return 'text-white';
      case 'warning':
        return 'text-gray-900';
      case 'info':
        return 'text-blue-800';
    }
  };

  const getMessageColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-100';
      case 'error':
        return 'text-red-100';
      case 'warning':
        return 'text-gray-800';
      case 'info':
        return 'text-gray-600';
    }
  };

  const getCloseButtonColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-200 hover:text-white';
      case 'error':
        return 'text-red-200 hover:text-white';
      case 'warning':
        return 'text-gray-600 hover:text-gray-900';
      case 'info':
        return 'text-gray-400 hover:text-gray-600';
    }
  };

  return (
    <div
      className={`${getBgColor()} rounded shadow-xl p-4 min-w-75 max-w-md animate-slide-in-right border-none`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${getTitleColor()}`}>{title}</h4>
          {message && (
            <p className={`text-sm mt-1 ${getMessageColor()}`}>{message}</p>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={`shrink-0 transition-colors ${getCloseButtonColor()}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Toast Container
let toastFunctions: any = null;

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number,
  ) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    // Auto remove after animation
    setTimeout(
      () => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      },
      (duration || 3000) + 300,
    );
  };

  // Store toast function globally
  useEffect(() => {
    toastFunctions = { showToast };
    return () => {
      toastFunctions = null;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

// Global toast function
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    toastFunctions?.showToast('success', title, message, duration);
  },
  error: (title: string, message?: string, duration?: number) => {
    toastFunctions?.showToast('error', title, message, duration);
  },
  warning: (title: string, message?: string, duration?: number) => {
    toastFunctions?.showToast('warning', title, message, duration);
  },
  info: (title: string, message?: string, duration?: number) => {
    toastFunctions?.showToast('info', title, message, duration);
  },
};
