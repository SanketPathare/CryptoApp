import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("crypto-favorites") || "[]");
  } catch {
    return [];
  }
};

const Watchlist = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [favIds, setFavIds] = useState(getFavorites());

  const favCoins = allCoin.filter((c) => favIds.includes(c.id));

  const removeFav = (id) => {
    const updated = favIds.filter((f) => f !== id);
    localStorage.setItem("crypto-favorites", JSON.stringify(updated));
    setFavIds(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-5 pt-12 pb-20"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Watchlist
        </h1>
        <p className="text-text-secondary text-sm">
          Your favorite coins, all in one place
        </p>
      </div>

      {favCoins.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <HiOutlineHeart className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-text-primary mb-2">No favorites yet</h3>
          <p className="text-text-secondary text-sm mb-6">Start adding coins to your watchlist by clicking the heart icon.</p>
          <Link
            to="/"
            className="inline-flex px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors"
          >
            Browse Coins
          </Link>
        </motion.div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[40px_2fr_1fr_1fr_1.5fr_40px] gap-4 px-6 py-4 border-b border-glass-border text-xs font-medium uppercase tracking-widest text-text-secondary">
            <span>#</span>
            <span>Coin</span>
            <span className="text-right">Price</span>
            <span className="text-center">24h</span>
            <span className="text-right">Market Cap</span>
            <span />
          </div>
          <div className="divide-y divide-glass-border">
            {favCoins.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/coins/${item.id}`}
                  className="grid grid-cols-[40px_2fr_1fr_1fr] md:grid-cols-[40px_2fr_1fr_1fr_1.5fr_40px] gap-4 px-6 py-4 items-center hover:bg-glass-hover transition-colors group"
                >
                  <span className="text-xs font-mono text-text-secondary">{item.market_cap_rank}</span>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image} alt="" className="w-7 h-7 rounded-full flex-shrink-0" />
                    <span className="font-medium text-sm text-text-primary truncate group-hover:text-gold transition-colors">{item.name}</span>
                    <span className="text-xs text-text-secondary uppercase hidden sm:inline">{item.symbol}</span>
                  </div>
                  <span className="font-mono text-sm text-right text-text-primary">
                    {currency.Symbol}{item.current_price?.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium text-center ${item.price_change_percentage_24h > 0 ? "text-signal-green" : "text-signal-red"}`}>
                    {item.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                  <span className="font-mono text-sm text-right text-text-secondary hidden md:block">
                    {currency.Symbol}{item.market_cap?.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFav(item.id); }}
                    className="p-1.5 rounded-lg hover:bg-glass-hover transition-colors cursor-pointer"
                  >
                    <HiHeart className="w-4 h-4 text-signal-red" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Watchlist;
