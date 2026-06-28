import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/watchlist", label: "Watchlist" },
  { path: "/pricing", label: "Pricing" },
  { path: "/converter", label: "Converter" },
  { path: "/categories", label: "Categories" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/compare", label: "Compare" },
  { path: "/contact", label: "Contact" },
];

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 overlay z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[85vw] sm:w-80 glass-hover z-50 flex flex-col pt-20 px-6 sm:px-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl glass hover:border-gold/30 transition-all cursor-pointer"
            >
              <HiX className="w-6 h-6 text-text-primary" />
            </button>
            <nav className="flex flex-col gap-5 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="font-display text-xl font-medium text-text-primary hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-auto pb-12 flex justify-center"
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
