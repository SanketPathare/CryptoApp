import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CoinContext } from "../context/coinContext";
import LiveDot from "./LiveDot";

const TrendingCoins = () => {
  const { trending } = useContext(CoinContext);

  if (!trending.length) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 min-w-[160px] h-24 skeleton-shimmer flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
      {trending.slice(0, 10).map((item, i) => {
        const coin = item.item;
        const change = coin.data?.price_change_percentage_24h?.usd;
        return (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/coins/${coin.id}`}
              className="glass-card rounded-2xl p-4 min-w-[170px] flex-shrink-0 block hover:border-gold/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={coin.thumb} alt="" className="w-8 h-8 rounded-full" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{coin.name}</p>
                  <p className="text-xs text-text-secondary uppercase">{coin.symbol}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary flex items-center gap-1">
                  <LiveDot active /> #{coin.market_cap_rank || "N/A"}
                </span>
                {change && (
                  <span className={`text-xs font-semibold ${change > 0 ? "text-signal-green" : "text-signal-red"}`}>
                    {change > 0 ? "+" : ""}{change.toFixed(2)}%
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TrendingCoins;
