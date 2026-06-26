import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";

const ToastNotification = () => {
  const { theme } = useTheme();

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
      theme={theme === "dark" ? "dark" : "light"}
      toastClassName="glass-hover rounded-2xl text-sm"
      bodyClassName="text-text-primary"
      progressClassName="bg-gold"
    />
  );
};

export default ToastNotification;
