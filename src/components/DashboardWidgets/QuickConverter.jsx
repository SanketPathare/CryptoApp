import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { HiSwitchHorizontal } from "react-icons/hi";

const QuickConverter = ({ activeCoin }) => {
  const { currency } = useContext(CoinContext);
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);
  const [isCoinToFiat, setIsCoinToFiat] = useState(true);

  const price = activeCoin?.current_price || 1;
  const symbol = activeCoin?.symbol?.toUpperCase() || "BTC";

  useEffect(() => {
    if (isCoinToFiat) {
      setConverted(amount * price);
    } else {
      setConverted(amount / price);
    }
  }, [amount, price, isCoinToFiat]);

  const handleSwap = () => {
    setIsCoinToFiat(!isCoinToFiat);
    setAmount(converted);
  };

  if (!activeCoin) return null;

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col justify-between h-[210px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Quick Converter
        </span>
        <button
          onClick={handleSwap}
          className="p-1.5 rounded-lg bg-glass border border-glass-border hover:bg-glass-hover hover:border-gold/30 transition-all cursor-pointer text-text-secondary hover:text-gold"
          title="Swap conversion direction"
        >
          <HiSwitchHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* From Field */}
        <div className="flex items-center justify-between bg-surface-secondary/40 border border-glass-border rounded-2xl px-4 py-2.5">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-text-secondary uppercase font-semibold">
              From
            </span>
            <input
              type="number"
              value={amount === 0 ? "" : Number(amount.toFixed(6))}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-transparent text-base md:text-sm text-text-primary font-mono font-bold outline-none border-none w-full mt-0.5"
              placeholder="0.00"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {isCoinToFiat ? (
              <>
                <img src={activeCoin.image} alt="" className="w-6 h-6 rounded-full" />
                <span className="text-xs font-bold text-text-primary font-mono">{symbol}</span>
              </>
            ) : (
              <span className="text-xs font-bold text-text-primary font-mono uppercase">{currency.name}</span>
            )}
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center justify-between bg-surface-secondary/40 border border-glass-border rounded-2xl px-4 py-2.5">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-text-secondary uppercase font-semibold">
              To
            </span>
            <span className="text-sm text-text-primary font-mono font-bold mt-0.5 truncate block">
              {isCoinToFiat
                ? `${currency.Symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
                : `${converted.toFixed(6)} ${symbol}`}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {!isCoinToFiat ? (
              <>
                <img src={activeCoin.image} alt="" className="w-6 h-6 rounded-full" />
                <span className="text-xs font-bold text-text-primary font-mono">{symbol}</span>
              </>
            ) : (
              <span className="text-xs font-bold text-text-primary font-mono uppercase">{currency.name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickConverter;
