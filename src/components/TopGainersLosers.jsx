import { useContext } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/coinContext";

const TopGainersLosers = () => {
  const { topGainersLosers } = useContext(CoinContext);

  if (!topGainersLosers) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 h-64 skeleton-shimmer" />
        ))}
      </div>
    );
  }

  const gainers = (topGainersLosers.top_gainers || []).slice(0, 5);
  const losers = (topGainersLosers.top_losers || []).slice(0, 5);

  const renderList = (items, positive) => (
    <div className="glass-card rounded-2xl p-5">
      <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${positive ? "text-signal-green" : "text-signal-red"}`}>
        {positive ? "Top Gainers \u2191" : "Top Losers \u2193"}
      </h3>
      <div className="space-y-3">
        {items.map((coin) => (
          <Link
            key={coin.id}
            to={`/coins/${coin.id}`}
            className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-glass-hover transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={coin.image} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
              <span className="text-sm text-text-primary truncate">{coin.name}</span>
              <span className="text-xs text-text-secondary uppercase">{coin.symbol}</span>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-text-primary">
                ${coin.current_price?.toLocaleString()}
              </p>
              <p className={`text-xs font-semibold ${positive ? "text-signal-green" : "text-signal-red"}`}>
                {positive ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderList(gainers, true)}
      {renderList(losers, false)}
    </div>
  );
};

export default TopGainersLosers;
