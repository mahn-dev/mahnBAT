import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const config = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
};

const success = (mes = 'Thành công') => {
    toast.success(mes, config);
};
const error = (mes = 'Thử lại') => {
    toast.error(mes, config);
};
const warning = (mes = 'Cảnh báo') => {
    toast.warn(mes, config);
};

export { success, error, warning };
