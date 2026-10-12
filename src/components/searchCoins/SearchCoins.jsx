import { useState, useEffect, useContext } from "react";
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
    if (sortField !== field) return <span className="ml-1 opacity-40">&#8597;</span>;
    return <span className="ml-1 text-spot">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>;
  };

  const headerBtn =
    "text-left bg-transparent border-none cursor-pointer text-text-secondary hover:text-spot transition-colors";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <form
          onSubmit={searchHandler}
          className="p-2 flex items-center gap-3 max-w-md flex-1 min-w-0 w-full sm:min-w-[250px] border border-rule rounded-md bg-glass focus-within:border-spot transition-colors"
        >
          <HiSearch className="w-5 h-5 text-text-secondary ml-2 flex-shrink-0" />
          <input
            onChange={inputHandler}
            list="coinList"
            value={input}
            type="text"
            placeholder="Search coins…"
            aria-label="Search coins"
            className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none placeholder-text-secondary min-w-0"
          />
          <datalist id="coinList">
            {allCoin.slice(0, 20).map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-text-primary text-surface text-sm font-semibold hover:bg-spot-deep transition-colors cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 text-sm">
          <Link to="/dashboard" className="border border-rule rounded-md px-3.5 py-2 text-text-secondary hover:border-spot hover:text-spot transition-colors">
            Dashboard
          </Link>
          <Link to="/categories" className="border border-rule rounded-md px-3.5 py-2 text-text-secondary hover:border-spot hover:text-spot transition-colors">
            Categories
          </Link>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={8} cols={5} />
      ) : (
        <div className="border-t border-b border-rule">
          <div className="hidden md:grid grid-cols-[40px_2fr_1fr_1fr_1fr_40px] gap-4 px-4 py-2.5 border-b border-rule text-xs text-text-secondary">
            <button onClick={() => handleSort("market_cap_rank")} className={headerBtn}>
              # <SortIcon field="market_cap_rank" />
            </button>
            <button onClick={() => handleSort("name")} className={headerBtn}>
              Coin <SortIcon field="name" />
            </button>
            <button onClick={() => handleSort("current_price")} className={`${headerBtn} text-right`}>
              Price <SortIcon field="current_price" />
            </button>
            <button onClick={() => handleSort("price_change_percentage_24h")} className={`${headerBtn} text-right`}>
              24h <SortIcon field="price_change_percentage_24h" />
            </button>
            <button onClick={() => handleSort("price_change_percentage_7d_in_currency")} className={`${headerBtn} text-right`}>
              7d <SortIcon field="price_change_percentage_7d_in_currency" />
            </button>
            <span />
          </div>

          <div>
            {sortedCoins.slice(0, 10).map((item) => {
              const sparklineData = item.sparkline_in_7d?.price;
              const positive = item.price_change_percentage_7d_in_currency > 0;
              return (
                <Link
                  key={item.id}
                  to={`/coins/${item.id}`}
                  className="grid grid-cols-[32px_2fr_1fr_1fr_30px] md:grid-cols-[40px_2fr_1fr_1fr_1fr_40px] gap-2 sm:gap-4 px-2 sm:px-4 py-3.5 items-center hover:bg-tint transition-colors duration-150 group border-b border-rule last:border-b-0"
                >
                  <span className="text-xs text-text-secondary tnum">
                    {item.market_cap_rank}
                  </span>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image} alt="" className="w-7 h-7 rounded-full flex-shrink-0" />
                    <span className="font-medium text-sm text-text-primary truncate group-hover:text-spot transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-text-secondary uppercase hidden sm:inline">
                      {item.symbol}
                    </span>
                  </div>
                  <span className="text-sm text-right text-text-primary tnum">
                    {currency.Symbol}
                    {item.current_price?.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm font-medium text-right tnum ${
                      item.price_change_percentage_24h > 0 ? "text-up" : "text-down"
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCoins;
