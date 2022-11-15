import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const createToast = (message, type = 'success') => {
  const config = {
    position: 'top-center',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === 'success') {
    toast.success(message, config);
  }

  if (type === 'error') {
    toast.error(message, config);
  }
};
