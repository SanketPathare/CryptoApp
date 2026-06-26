import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import SparklineChart from "../SparklineChart";
import { HiHeart, HiStar } from "react-icons/hi";

const DashboardWatchlist = ({ activeCoinId, onSelectCoinId }) => {
  const { allCoin, currency } = useContext(CoinContext);
  const [favIds, setFavIds] = useState([]);

  const loadFavorites = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("crypto-favorites") || "[]");
      setFavIds(favs);
    } catch {
      setFavIds([]);
    }
  };

  useEffect(() => {
    loadFavorites();
    const interval = setInterval(loadFavorites, 2000);
    return () => clearInterval(interval);
  }, []);

  const removeFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favIds.filter((f) => f !== id);
    localStorage.setItem("crypto-favorites", JSON.stringify(updated));
    setFavIds(updated);
  };

  const favCoins = allCoin.filter((c) => favIds.includes(c.id));

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col min-h-[200px] sm:min-h-[220px]">
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Watchlist glance
        </span>
        <span className="text-[9px] sm:text-[10px] text-text-secondary font-medium">
          {favCoins.length} pinned
        </span>
      </div>

      {favCoins.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-4 text-center">
          <HiStar className="w-7 h-7 sm:w-8 sm:h-8 text-glass-border mb-2" />
          <p className="text-[10px] sm:text-xs text-text-secondary max-w-[170px]">
            No coins added to favorites. Heart a coin to pin it here.
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto max-h-[160px] sm:max-h-[170px] scrollbar-thin pr-1">
          {favCoins.slice(0, 4).map((coin) => {
            const sparklineData = coin.sparkline_in_7d?.price;
            const change = coin.price_change_percentage_24h || 0;
            const positive = change >= 0;
            const isActive = coin.id === activeCoinId;

            return (
              <div
                key={coin.id}
                onClick={() => onSelectCoinId(coin.id)}
                className={`flex items-center justify-between p-1.5 sm:p-2 rounded-xl cursor-pointer border transition-all ${
                  isActive
                    ? "bg-gold/10 border-gold/40 shadow-inner"
                    : "bg-surface-secondary/20 border-glass-border hover:bg-glass-hover hover:border-gold/20"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <img src={coin.image} alt="" className="w-5 h-5 rounded-full flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold text-text-primary truncate">{coin.name}</p>
                    <p className="text-[8px] sm:text-[9px] text-text-secondary uppercase font-mono">{coin.symbol}</p>
                  </div>
                </div>

                <div className="hidden sm:block flex-shrink-0 mx-2 opacity-75">
                  {sparklineData && (
                    <SparklineChart data={sparklineData.slice(-24)} width={50} height={16} positive={positive} />
                  )}
                </div>

                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-text-primary">
                      {currency.Symbol}
                      {coin.current_price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <p className={`text-[8px] sm:text-[9px] font-bold ${positive ? "text-signal-green" : "text-signal-red"}`}>
                      {positive ? "+" : ""}
                      {change.toFixed(1)}%
                    </p>
                  </div>
                  <button
                    onClick={(e) => removeFav(e, coin.id)}
                    className="p-1 rounded-md hover:bg-glass border border-transparent hover:border-glass-border text-signal-red transition-all cursor-pointer flex-shrink-0"
                  >
                    <HiHeart className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardWatchlist;
