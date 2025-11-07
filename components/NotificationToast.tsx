import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface NotificationToastProps {
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className={`p-4 rounded-xl shadow-2xl border ${
            notification.type === 'success' ? 'bg-emerald-900/90 border-emerald-500' :
            notification.type === 'error' ? 'bg-red-900/90 border-red-500' :
            'bg-blue-900/90 border-blue-500'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
