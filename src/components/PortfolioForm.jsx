import { useState, useContext } from "react";
import { CoinContext } from "../context/coinContext";
import { toast } from "react-toastify";
import { HiX } from "react-icons/hi";

const PortfolioForm = ({ onClose }) => {
  const { allCoin } = useContext(CoinContext);
  const [coinId, setCoinId] = useState(allCoin[0]?.id || "");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coinId || !quantity || !buyPrice) {
      toast.warn("Please fill in all fields");
      return;
    }
    const portfolio = JSON.parse(localStorage.getItem("crypto-portfolio") || "[]");
    portfolio.push({
      id: Date.now(),
      coinId,
      quantity: parseFloat(quantity),
      buyPrice: parseFloat(buyPrice),
      date: new Date().toISOString(),
    });
    localStorage.setItem("crypto-portfolio", JSON.stringify(portfolio));
    toast.success("Added to portfolio!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay">
      <div className="glass-hover rounded-3xl p-6 md:p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl glass hover:border-gold/30 transition-all cursor-pointer">
          <HiX className="w-5 h-5 text-text-primary" />
        </button>
        <h3 className="font-display text-xl font-bold text-text-primary mb-6">Add to Portfolio</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">Coin</label>
            <select
              value={coinId}
              onChange={(e) => setCoinId(e.target.value)}
              className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none appearance-none cursor-pointer"
            >
              {allCoin.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">Quantity</label>
            <input
              type="number"
              step="any"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 0.5"
              className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2 block">Buy Price (USD)</label>
            <input
              type="number"
              step="any"
              min="0"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="e.g. 45000"
              className="glass rounded-xl p-3 w-full text-sm text-text-primary outline-none border-none placeholder-text-secondary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
          >
            Add to Portfolio
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
