import { useContext } from "react";
import { CoinContext } from "../context/coinContext";
import CountUp from "./CountUp";
import LiveDot from "./LiveDot";

const GlobalStats = () => {
  const { globalData } = useContext(CoinContext);

  if (!globalData) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 h-24 skeleton-shimmer" />
        ))}
      </div>
    );
  }

  const stats = [
    { label: "Total Market Cap", value: globalData.total_market_cap?.usd || 0, prefix: "$" },
    { label: "24h Volume", value: globalData.total_volume?.usd || 0, prefix: "$" },
    { label: "BTC Dominance", value: globalData.market_cap_percentage?.btc || 0, suffix: "%", decimals: 1 },
    { label: "Active Coins", value: globalData.active_cryptocurrencies || 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <LiveDot active />
            <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
              {stat.label}
            </span>
          </div>
          <p className="font-display text-xl md:text-2xl font-bold text-text-primary font-mono">
            {stat.prefix}
            <CountUp end={stat.value} decimals={stat.decimals || 0} />
            {stat.suffix}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GlobalStats;
