import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { CoinContext } from "../../context/coinContext";
import CompareSelector from "../../components/CompareSelector";
import CompareRow from "../../components/CompareRow";

const Compare = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [selected, setSelected] = useState([]);

  const coins = allCoin.filter((c) => selected.includes(c.id));

  const handleAdd = (id) => {
    if (selected.length < 3) setSelected([...selected, id]);
  };
  const handleRemove = (id) => {
    setSelected(selected.filter((s) => s !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-5 pt-24 pb-20"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Compare Coins
        </h1>
        <p className="text-text-secondary text-sm">
          Side-by-side comparison of up to 3 cryptocurrencies
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <CompareSelector
          selectedCoins={selected}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </div>

      {coins.length < 2 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-text-secondary">Select at least 2 coins to compare</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl overflow-hidden min-w-[600px]"
          >
            <div
              style={{ gridTemplateColumns: `120px repeat(${coins.length}, 1fr)` }}
              className="grid gap-4 px-4 py-4 border-b border-glass-border bg-glass-hover items-center"
            >
            <span />
            {coins.map((c) => (
              <div key={c.id} className="text-center">
                <img src={c.image} alt="" className="w-8 h-8 mx-auto mb-1 rounded-full" />
                <p className="font-display text-sm font-semibold text-text-primary">{c.name}</p>
                <p className="text-xs text-text-secondary uppercase">{c.symbol}</p>
              </div>
            ))}
          </div>

          <CompareRow label="Price" values={coins.map((c) => `${currency.Symbol}${c.current_price?.toLocaleString()}`)} />
          <CompareRow label="Market Cap" format="dollar" values={coins.map((c) => c.market_cap)} />
          <CompareRow label="24h Change" format="percent" values={coins.map((c) => c.price_change_percentage_24h || 0)} />
          <CompareRow label="7d Change" format="percent" values={coins.map((c) => c.price_change_percentage_7d_in_currency || 0)} />
          <CompareRow label="30d Change" format="percent" values={coins.map((c) => c.price_change_percentage_30d_in_currency || 0)} />
          <CompareRow label="24h Volume" format="dollar" values={coins.map((c) => c.total_volume)} />
          <CompareRow label="All-Time High" format="dollar" values={coins.map((c) => c.ath)} />
          <CompareRow label="Circulating Supply" values={coins.map((c) => (c.circulating_supply || 0).toLocaleString())} />
          <CompareRow label="Total Supply" values={coins.map((c) => (c.total_supply || 0).toLocaleString())} />
          <CompareRow label="Max Supply" values={coins.map((c) => (c.max_supply || 0).toLocaleString())} />
        </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Compare;
