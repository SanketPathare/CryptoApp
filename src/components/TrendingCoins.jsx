import { useContext } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import LiveDot from "./LiveDot";

const TrendingCoins = () => {
  const { trending } = useContext(CoinContext);

  if (!trending.length) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-3 min-w-[150px] h-20 skeleton-shimmer rounded-md flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {trending.slice(0, 10).map((item) => {
        const coin = item.item;
        const change = coin.data?.price_change_percentage_24h?.usd;
        return (
          <Link
            key={coin.id}
            to={`/coins/${coin.id}`}
            className="p-3 min-w-[150px] flex-shrink-0 block border border-rule rounded-md bg-surface hover:border-spot transition-colors"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <img src={coin.thumb} alt="" className="w-7 h-7 rounded-full" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{coin.name}</p>
                <p className="text-xs text-text-secondary uppercase">{coin.symbol}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary flex items-center gap-1.5">
                <LiveDot active /> #{coin.market_cap_rank || "—"}
              </span>
              {change != null && (
                <span className={`text-xs font-semibold tnum ${change > 0 ? "text-up" : "text-down"}`}>
                  {change > 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingCoins;
