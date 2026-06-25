import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-xl glass hover:border-gold/30 transition-all duration-300 cursor-pointer"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <HiSun className="w-5 h-5 text-gold" />
        ) : (
          <HiMoon className="w-5 h-5 text-gold-dark" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
