import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/20 border-emerald-500/30';
      case 'error':
        return 'bg-red-500/20 border-red-500/30';
      default:
        return 'bg-blue-500/20 border-blue-500/30';
    }
  };

  return (
    <div className={`flex items-center space-x-3 rounded-2xl border p-4 ${getBgColor()} backdrop-blur-sm`}>
      {getIcon()}
      <span className="flex-1 text-sm text-gray-100">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="rounded-full p-1 text-gray-400 hover:text-gray-300"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;