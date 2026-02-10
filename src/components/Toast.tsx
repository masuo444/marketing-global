"use client";

import { createContext, useContext, ReactNode } from "react";
import { useToast, Toast, ToastType } from "@/hooks/useToast";
import { IconCheck, IconAlertTriangle, IconInfo, IconClose } from "./icons";

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
});

export function useToastContext() {
  return useContext(ToastContext);
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const colorMap: Record<ToastType, string> = {
    success: "border-success bg-success-bg text-success",
    error: "border-red bg-red/10 text-red",
    info: "border-info bg-info-bg text-info",
    warning: "border-warning bg-warning-bg text-warning",
  };

  const IconMap: Record<ToastType, React.ComponentType<{ size?: number }>> = {
    success: IconCheck,
    error: IconAlertTriangle,
    info: IconInfo,
    warning: IconAlertTriangle,
  };

  const Icon = IconMap[toast.type];

  return (
    <div
      className={`animate-toast-in flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${colorMap[toast.type]}`}
    >
      <Icon size={16} />
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="opacity-60 hover:opacity-100 transition-opacity"
      >
        <IconClose size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
