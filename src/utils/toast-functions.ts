import toast from 'react-hot-toast';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      background: '#4CAF50',
      color: 'white',
    },
  });
};

export const showWarningToast = (message: string) => {
  toast.error(message, {
    style: {
      background: '#F44336',
      color: 'white',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: '#F44336',
      color: 'white',
    },
  });
};

export const showPendingToast = (message: string) => {
  return toast.loading(message, {
    style: {
      background: '#2196F3',
      color: 'white',
    },
  });
};
