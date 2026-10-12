import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
            className="fixed top-0 right-0 h-full w-[85vw] sm:w-80 bg-surface border-l border-rule z-50 flex flex-col pt-20 px-6 sm:px-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-md border border-rule hover:border-spot transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <HiX className="w-5 h-5 text-text-primary" />
            </button>
            <nav className="flex flex-col mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`font-display text-xl py-3 border-b border-rule transition-colors duration-150 ${
                    location.pathname === link.path
                      ? "text-spot"
                      : "text-text-primary hover:text-spot"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-12 flex justify-center">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
