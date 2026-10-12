import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-md border border-rule bg-surface-secondary hover:border-spot transition-colors cursor-pointer"
      whileTap={{ scale: 0.92 }}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <HiSun className="w-4 h-4 text-spot" />
        ) : (
          <HiMoon className="w-4 h-4 text-text-secondary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
