import { useEffect, useState } from 'react';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClass = type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : '';

  return (
    <div className={`toast-container ${isVisible ? '' : 'opacity-0'}`}>
      <div className={`toast-custom ${typeClass} d-flex align-items-center gap-2`}>
        <i className={`bi ${
          type === 'success' ? 'bi-check-circle-fill text-success' : 
          type === 'error' ? 'bi-x-circle-fill text-danger' : 
          'bi-info-circle-fill text-info'
        }`}></i>
        <span>{message}</span>
        <button 
          className="btn btn-link text-secondary p-0 ms-2"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
