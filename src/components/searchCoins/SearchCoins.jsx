import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { CoinContext } from "../../context/coinContext";
import FavoritesButton from "../FavoritesButton";
import SparklineChart from "../SparklineChart";
import LoadingSkeleton from "../LoadingSkeleton";

const SearchCoins = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    if (allCoin.length > 0) {
      setDisplayCoin(allCoin);
      setLoading(false);
    }
  }, [allCoin]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const filtered = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(filtered);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const sortedCoins = [...displayCoin].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "string")
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === "asc" ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="ml-1 opacity-30">&#8597;</span>;
    return <span className="ml-1 text-gold">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={searchHandler}
          className="glass-card rounded-2xl p-2 flex items-center gap-3 max-w-md flex-1 min-w-[250px]"
        >
          <HiSearch className="w-5 h-5 text-text-secondary ml-3 flex-shrink-0" />
          <input
            onChange={inputHandler}
            list="coinList"
            value={input}
            type="text"
            placeholder="Search crypto..."
            className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none placeholder-text-secondary"
          />
          <datalist id="coinList">
            {allCoin.slice(0, 20).map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gold text-black text-sm font-semibold hover:bg-gold-dark transition-colors cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </motion.form>

        <div className="flex gap-2 text-xs text-text-secondary">
          <Link to="/dashboard" className="glass rounded-xl px-4 py-2 hover:border-gold/30 transition-all">
            Dashboard
          </Link>
          <Link to="/categories" className="glass rounded-xl px-4 py-2 hover:border-gold/30 transition-all">
            Categories
          </Link>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={8} cols={5} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="hidden md:grid grid-cols-[40px_2fr_1fr_1fr_1fr_40px] gap-4 px-6 py-4 border-b border-glass-border text-xs font-medium uppercase tracking-widest text-text-secondary">
            <button onClick={() => handleSort("market_cap_rank")} className="text-left bg-transparent border-none cursor-pointer text-text-secondary hover:text-gold transition-colors">
              # <SortIcon field="market_cap_rank" />
            </button>
            <button onClick={() => handleSort("name")} className="text-left bg-transparent border-none cursor-pointer text-text-secondary hover:text-gold transition-colors">
              Coin <SortIcon field="name" />
            </button>
            <button onClick={() => handleSort("current_price")} className="text-right bg-transparent border-none cursor-pointer text-text-secondary hover:text-gold transition-colors">
              Price <SortIcon field="current_price" />
            </button>
            <button onClick={() => handleSort("price_change_percentage_24h")} className="text-center bg-transparent border-none cursor-pointer text-text-secondary hover:text-gold transition-colors">
              24h <SortIcon field="price_change_percentage_24h" />
            </button>
            <button onClick={() => handleSort("market_cap")} className="text-right bg-transparent border-none cursor-pointer text-text-secondary hover:text-gold transition-colors">
              7D <SortIcon field="market_cap" />
            </button>
            <span />
          </div>

          <div className="divide-y divide-glass-border">
            {sortedCoins.slice(0, 10).map((item, index) => {
              const sparklineData = item.sparkline_in_7d?.price;
              const positive = item.price_change_percentage_7d_in_currency > 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/coins/${item.id}`}
                    className="grid grid-cols-[40px_2fr_1fr_1fr] md:grid-cols-[40px_2fr_1fr_1fr_1fr_40px] gap-4 px-6 py-4 items-center hover:bg-glass-hover transition-colors duration-150 group"
                  >
                    <span className="text-xs font-mono text-text-secondary">
                      {item.market_cap_rank}
                    </span>
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.image} alt="" className="w-7 h-7 rounded-full flex-shrink-0" />
                      <span className="font-medium text-sm text-text-primary truncate group-hover:text-gold transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-text-secondary uppercase hidden sm:inline">
                        {item.symbol}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-right text-text-primary">
                      {currency.Symbol}
                      {item.current_price?.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm font-medium text-center ${
                        item.price_change_percentage_24h > 0 ? "text-signal-green" : "text-signal-red"
                      }`}
                    >
                      {item.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    <span className="hidden md:flex items-center justify-end">
                      {sparklineData && (
                        <SparklineChart data={sparklineData} width={80} height={24} positive={positive} />
                      )}
                    </span>
                    <FavoritesButton coinId={item.id} coinName={item.name} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchCoins;
