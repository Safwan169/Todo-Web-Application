import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#5272FF',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  info: (message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#6b7280',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },
};

