import { useContext, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import { HiTrash } from "react-icons/hi";
import TiltCard from "./TiltCard";

const PortfolioCard = ({ holding, onDelete }) => {
  const { allCoin, currency } = useContext(CoinContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const coin = allCoin.find((c) => c.id === holding.coinId);

  // Compute USD conversion rate dynamically based on stablecoins price
  const usdRate = allCoin.find((c) => c.symbol === "usdt" || c.symbol === "usdc")?.current_price || 1;
  const currentPrice = coin?.current_price || 0;
  const totalValue = holding.quantity * currentPrice;
  const activeBuyPrice = holding.buyPrice * usdRate;
  const costBasis = holding.quantity * activeBuyPrice;
  const pnl = totalValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

  return (
    <TiltCard disabled={isMobile} className="h-full">
      <Link
        to={`/coins/${holding.coinId}`}
        className="glass-card rounded-2xl p-5 block hover:border-gold/30 transition-all h-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {coin?.image && <img src={coin.image} alt="" className="w-8 h-8 rounded-full" />}
            <div>
              <p className="font-display text-base font-semibold text-text-primary">{coin?.name || holding.coinId}</p>
              <p className="text-xs text-text-secondary uppercase">{coin?.symbol}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(holding.id); }}
            className="p-2 rounded-lg hover:bg-glass-hover text-text-secondary hover:text-signal-red transition-all cursor-pointer"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs">
          <div>
            <p className="text-text-secondary uppercase tracking-wider mb-1">Quantity</p>
            <p className="font-mono text-text-primary font-medium">{holding.quantity}</p>
          </div>
          <div>
            <p className="text-text-secondary uppercase tracking-wider mb-1">Avg Buy</p>
            <p className="font-mono text-text-primary font-medium">
              {currency.Symbol}{activeBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-text-secondary uppercase tracking-wider mb-1">Current Value</p>
            <p className="font-mono text-text-primary font-medium">
              {currency.Symbol}{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-text-secondary uppercase tracking-wider mb-1">P&L</p>
            <p className={`font-mono font-semibold ${pnl >= 0 ? "text-signal-green" : "text-signal-red"}`}>
              {pnl >= 0 ? "+" : ""}{currency.Symbol}{pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({pnlPercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

export default PortfolioCard;
