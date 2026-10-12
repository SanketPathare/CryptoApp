import { useContext, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import SparklineChart from "./SparklineChart";

const ROW_COUNT = 8;

const SkeletonRow = () => (
  <div className="px-4 md:px-5 py-3.5 border-b border-rule last:border-b-0 flex items-center gap-4">
    <div className="h-3.5 w-4 skeleton-shimmer rounded" />
    <div className="h-3.5 flex-1 max-w-[9rem] skeleton-shimmer rounded" />
    <div className="h-3.5 w-16 skeleton-shimmer rounded" />
    <div className="h-3.5 w-10 skeleton-shimmer rounded hidden md:block" />
  </div>
);

const MarketBoard = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [updated, setUpdated] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (allCoin.length > 0 && !updated) {
      setUpdated(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }, [allCoin, updated]);

  const rows = allCoin.slice(0, ROW_COUNT);

  return (
    <div className="border border-rule rounded-md bg-glass overflow-hidden elevation-1">
      <div className="flex items-baseline justify-between gap-4 px-4 md:px-5 py-3 border-b border-rule">
        <h2 className="text-sm font-semibold text-text-primary">Market</h2>
        <p className="text-xs text-text-secondary tnum">
          {updated ? `Updated ${updated}` : "Fetching prices…"}
        </p>
      </div>

      <div className="hidden md:grid grid-cols-[2rem_minmax(0,1fr)_7rem_5rem_5.5rem] lg:grid-cols-[2rem_minmax(0,1fr)_7rem_5rem_5.5rem_7rem] gap-4 px-5 py-2 border-b border-rule text-xs text-text-secondary">
        <span>#</span>
        <span>Coin</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h</span>
        <span className="text-right">7d</span>
        <span className="text-right hidden lg:block">Market cap</span>
      </div>

      {rows.length === 0 ? (
        <div>
          {Array.from({ length: ROW_COUNT }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : (
        <div>
          {rows.map((coin, i) => {
            const change = coin.price_change_percentage_24h;
            const up = change >= 0;
            const spark = coin.sparkline_in_7d?.price;
            return (
              <motion.div
                key={coin.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.25 }}
              >
                <Link
                  to={`/coins/${coin.id}`}
                  className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto_4.5rem] md:grid-cols-[2rem_minmax(0,1fr)_7rem_5rem_5.5rem] lg:grid-cols-[2rem_minmax(0,1fr)_7rem_5rem_5.5rem_7rem] items-center gap-3 md:gap-4 px-4 md:px-5 py-3 border-b border-rule last:border-b-0 hover:bg-tint transition-colors group"
                >
                  <span className="text-xs text-text-secondary tnum">
                    {coin.market_cap_rank}
                  </span>

                  <span className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={coin.image}
                      alt=""
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-text-primary truncate group-hover:text-spot transition-colors">
                      {coin.name}
                    </span>
                    <span className="text-xs text-text-secondary uppercase hidden sm:inline">
                      {coin.symbol}
                    </span>
                  </span>

                  <span className="text-sm md:text-[15px] font-medium text-text-primary tnum text-right">
                    {currency.Symbol}
                    {coin.current_price?.toLocaleString()}
                  </span>

                  <span
                    className={`text-xs md:text-sm tnum text-right ${
                      up ? "text-up" : "text-down"
                    }`}
                  >
                    {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                  </span>

                  <span className="hidden md:flex justify-end">
                    {spark && (
                      <SparklineChart
                        data={spark}
                        width={72}
                        height={22}
                        positive={up}
                      />
                    )}
                  </span>

                  <span className="hidden lg:block text-xs text-text-secondary tnum text-right">
                    {currency.Symbol}
                    {(coin.market_cap / 1e9).toFixed(1)}B
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <a
        href="#prices"
        className="block px-4 md:px-5 py-2.5 text-xs font-medium text-spot hover:bg-tint transition-colors border-t border-rule"
      >
        See the full price table
      </a>
    </div>
  );
};

export default MarketBoard;
