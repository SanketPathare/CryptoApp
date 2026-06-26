import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { motion, AnimatePresence } from "framer-motion";
import LiveDot from "../LiveDot";

const LiveOrderBook = () => {
  const { allCoin } = useContext(CoinContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!allCoin || allCoin.length === 0) return;

    // Seed initial orders
    const seed = [];
    const coins = allCoin.slice(0, 5);
    for (let i = 0; i < 6; i++) {
      const coin = coins[Math.floor(Math.random() * coins.length)];
      const isBuy = Math.random() > 0.5;
      const amount = Math.random() * 2.5 + 0.05;
      const priceOffset = (Math.random() - 0.5) * 0.002; // +/- 0.1% spread
      const price = (coin.current_price || 1) * (1 + priceOffset);

      seed.push({
        id: Math.random().toString(),
        symbol: coin.symbol.toUpperCase(),
        side: isBuy ? "buy" : "sell",
        amount,
        price,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    }
    setOrders(seed);

    // Dynamic order ticks
    const interval = setInterval(() => {
      const coin = coins[Math.floor(Math.random() * coins.length)];
      const isBuy = Math.random() > 0.48; // slightly favor buys
      const amount = Math.random() * 3.2 + 0.01;
      const priceOffset = (Math.random() - 0.5) * 0.0015;
      const price = (coin.current_price || 1) * (1 + priceOffset);

      const newOrder = {
        id: Math.random().toString(),
        symbol: coin.symbol.toUpperCase(),
        side: isBuy ? "buy" : "sell",
        amount,
        price,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };

      setOrders((prev) => [newOrder, ...prev.slice(0, 5)]);
    }, 1800);

    return () => clearInterval(interval);
  }, [allCoin]);

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col justify-between h-[210px] overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Live Trade Feed
        </span>
        <span className="flex items-center gap-1.5 text-[9px] text-gold bg-gold/10 px-2 py-0.5 rounded-lg font-mono">
          <LiveDot active /> Sim Feed
        </span>
      </div>

      {/* Trades grid container */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr] px-2 py-1 text-[9px] font-bold text-text-secondary uppercase tracking-wider border-b border-glass-border">
          <span>Coin</span>
          <span>Side</span>
          <span className="text-right">Price</span>
          <span className="text-right font-mono">Size</span>
        </div>

        <div className="mt-1 space-y-1 relative h-[120px] overflow-hidden">
          <AnimatePresence initial={false}>
            {orders.map((ord) => (
              <motion.div
                key={ord.id}
                initial={{ opacity: 0, y: -15, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr] px-2 py-1 items-center text-[10px] hover:bg-glass-hover rounded-lg transition-colors overflow-hidden"
              >
                <span className="font-bold text-text-primary">{ord.symbol}</span>
                <span
                  className={`font-semibold capitalize text-[9px] px-1.5 py-0.2 rounded w-fit ${
                    ord.side === "buy" ? "bg-signal-green/10 text-signal-green" : "bg-signal-red/10 text-signal-red"
                  }`}
                >
                  {ord.side}
                </span>
                <span className="font-mono text-right text-text-primary">
                  ${ord.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="font-mono text-right text-text-secondary">
                  {ord.amount.toFixed(3)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LiveOrderBook;
