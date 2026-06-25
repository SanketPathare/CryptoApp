import { motion } from "framer-motion";

const CategoryCard = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="glass-card rounded-2xl p-5 hover:border-gold/30"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base font-semibold text-text-primary truncate">
          {category.name}
        </h3>
        {category.top_3_coins?.slice(0, 3).map((url, i) => (
          <img key={i} src={url} alt="" className="w-5 h-5 -ml-2 first:ml-0 rounded-full border border-glass-border" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">Market Cap</p>
          <p className="font-mono text-text-primary font-medium">
            ${(category.market_cap || 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">24h</p>
          <p className={`font-mono font-medium ${(category.market_cap_change_percentage_24h || 0) > 0 ? "text-signal-green" : "text-signal-red"}`}>
            {category.market_cap_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-text-secondary uppercase tracking-wider mb-1">Volume</p>
          <p className="font-mono text-text-primary font-medium">
            ${(category.volume_24h || 0).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
