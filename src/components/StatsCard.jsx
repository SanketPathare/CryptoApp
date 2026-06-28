import { motion } from "framer-motion";

const StatsCard = ({ icon, label, value, color = "gold" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-2 min-w-0"
    >
      <div className={`text-2xl ${color === "gold" ? "text-gold" : color === "green" ? "text-signal-green" : "text-signal-red"}`}>
        {icon}
      </div>
      <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">
        {label}
      </span>
      <span className="font-display text-xl font-semibold text-text-primary">
        {value}
      </span>
    </motion.div>
  );
};

export default StatsCard;
