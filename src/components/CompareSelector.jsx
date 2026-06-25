import { useState, useContext } from "react";
import { CoinContext } from "../context/coinContext";
import { HiPlus } from "react-icons/hi";

const CompareSelector = ({ selectedCoins, onAdd, onRemove }) => {
  const { allCoin } = useContext(CoinContext);
  const [search, setSearch] = useState("");

  const filtered = allCoin.filter(
    (c) =>
      !selectedCoins.includes(c.id) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="glass rounded-xl p-2 flex items-center gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coins to compare..."
          className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none placeholder-text-secondary"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedCoins.map((id) => {
          const coin = allCoin.find((c) => c.id === id);
          return (
            <span key={id} className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-text-primary">
              {coin?.name || id}
              <button onClick={() => onRemove(id)} className="hover:text-signal-red transition-colors cursor-pointer">&times;</button>
            </span>
          );
        })}
      </div>
      {search && (
        <div className="max-h-40 overflow-y-auto space-y-1">
          {filtered.slice(0, 10).map((c) => (
            <button
              key={c.id}
              onClick={() => { onAdd(c.id); setSearch(""); }}
              className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-glass-hover text-left transition-colors cursor-pointer"
              disabled={selectedCoins.length >= 3}
            >
              <img src={c.image} alt="" className="w-6 h-6 rounded-full" />
              <span className="text-sm text-text-primary flex-1">{c.name}</span>
              <span className="text-xs text-text-secondary uppercase">{c.symbol}</span>
              <HiPlus className="w-4 h-4 text-gold" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareSelector;
