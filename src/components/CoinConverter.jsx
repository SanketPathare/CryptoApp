import { useContext, useState } from "react";
import { CoinContext } from "../context/coinContext";
import { HiSwitchHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";

const CoinConverter = () => {
  const { allCoin } = useContext(CoinContext);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("bitcoin");
  const [to, setTo] = useState("ethereum");

  const fromCoin = allCoin.find((c) => c.id === from);
  const toCoin = allCoin.find((c) => c.id === to);
  const rate = fromCoin && toCoin ? fromCoin.current_price / toCoin.current_price : 0;
  const result = amount * rate;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setAmount(1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.toFixed(8));
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto">
      <h3 className="font-display text-lg font-semibold text-text-primary mb-6">
        Cryptocurrency Converter
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, e.target.value))}
            min="0"
            step="any"
            className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none appearance-none cursor-pointer"
            >
              {allCoin.slice(0, 50).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-2.5 rounded-xl glass hover:border-gold/30 transition-all mt-6 cursor-pointer"
          >
            <HiSwitchHorizontal className="w-5 h-5 text-gold" />
          </button>

          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none appearance-none cursor-pointer"
            >
              {allCoin.slice(0, 50).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="glass rounded-xl p-4 mt-4 text-center">
          <p className="text-text-secondary text-xs uppercase tracking-widest mb-1">Result</p>
          <p className="font-display text-2xl font-bold text-gold font-mono">
            {result.toFixed(8)}
          </p>
          <p className="text-text-secondary text-xs mt-1">
            1 {fromCoin?.symbol?.toUpperCase()} = {rate.toFixed(8)} {toCoin?.symbol?.toUpperCase()}
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 px-4 py-1.5 rounded-lg glass text-xs text-text-secondary hover:text-gold transition-all cursor-pointer"
          >
            Copy Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinConverter;
