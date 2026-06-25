import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
      toastClassName="glass-hover rounded-2xl text-sm"
      bodyClassName="text-text-primary"
      progressClassName="bg-gold"
    />
  );
};

export default ToastNotification;
