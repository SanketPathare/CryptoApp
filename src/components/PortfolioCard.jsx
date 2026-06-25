import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import { HiTrash } from "react-icons/hi";

const PortfolioCard = ({ holding, onDelete }) => {
  const { allCoin } = useContext(CoinContext);
  const coin = allCoin.find((c) => c.id === holding.coinId);

  const currentPrice = coin?.current_price || 0;
  const totalValue = holding.quantity * currentPrice;
  const costBasis = holding.quantity * holding.buyPrice;
  const pnl = totalValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

  return (
    <Link
      to={`/coins/${holding.coinId}`}
      className="glass-card rounded-2xl p-5 block hover:border-gold/30 transition-all"
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

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">Quantity</p>
          <p className="font-mono text-text-primary font-medium">{holding.quantity}</p>
        </div>
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">Avg Buy</p>
          <p className="font-mono text-text-primary font-medium">${holding.buyPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">Current Value</p>
          <p className="font-mono text-text-primary font-medium">${totalValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-text-secondary uppercase tracking-wider mb-1">P&L</p>
          <p className={`font-mono font-semibold ${pnl >= 0 ? "text-signal-green" : "text-signal-red"}`}>
            {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
