"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { useEffect } from "react";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: "border-green-500/20 bg-green-500/10 text-green-500",
  error: "border-red-500/20 bg-red-500/10 text-red-500",
  info: "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
};

const iconStyles = {
  success: "bg-green-500 shadow-green-500/20",
  error: "bg-red-500 shadow-red-500/20",
  info: "bg-yellow-500 shadow-yellow-400/20",
};

export default function Toast({ message, type = "success", onClose, duration = 4000 }) {
  const Icon = icons[type] || Info;

  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl
        min-w-[300px] max-w-md pointer-events-auto
        ${styles[type]}
      `}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${iconStyles[type]}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black uppercase tracking-widest opacity-60 leading-none mb-1">
          {type === 'error' ? 'System Alert' : type === 'success' ? 'Task Complete' : 'Information'}
        </p>
        <p className="text-[11px] font-bold leading-tight break-words text-white/90">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
