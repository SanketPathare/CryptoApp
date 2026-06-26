import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-5"
    >
      <div className="glass-card rounded-3xl p-10 md:p-14 text-center max-w-md">
        <h1 className="font-display text-7xl md:text-8xl font-bold text-gradient-brand mb-4">
          404
        </h1>
        <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
