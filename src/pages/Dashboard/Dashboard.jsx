import { useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CoinContext } from "../../context/coinContext";
import GlobalStats from "../../components/GlobalStats";
import TrendingCoins from "../../components/TrendingCoins";
import TopGainersLosers from "../../components/TopGainersLosers";
import CustomChart from "../../components/CustomChart/CustomChart";
import MarketSentiment from "../../components/DashboardWidgets/MarketSentiment";
import MarketShare from "../../components/DashboardWidgets/MarketShare";
import QuickConverter from "../../components/DashboardWidgets/QuickConverter";
import DashboardWatchlist from "../../components/DashboardWidgets/DashboardWatchlist";
import LiveOrderBook from "../../components/DashboardWidgets/LiveOrderBook";
import { HiFire, HiArrowUp, HiArrowDown, HiSearch, HiOutlineTrendingUp, HiChevronDown } from "react-icons/hi";

const quickSelectCoins = [
  { id: "bitcoin", name: "BTC" },
  { id: "ethereum", name: "ETH" },
  { id: "solana", name: "SOL" },
  { id: "cardano", name: "ADA" },
  { id: "dogecoin", name: "DOGE" },
  { id: "ripple", name: "XRP" },
];

const Dashboard = () => {
  const { allCoin } = useContext(CoinContext);
  const [activeCoinId, setActiveCoinId] = useState("bitcoin");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!allCoin || allCoin.length === 0) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-glass-border border-t-gold animate-spin" />
          <span className="text-sm text-text-secondary">Retrieving market data...</span>
        </div>
      </div>
    );
  }

  const activeCoin = allCoin.find((c) => c.id === activeCoinId) || allCoin[0];

  const filteredCoins = allCoin.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-5 pt-20 sm:pt-24 pb-20 space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
        <div className="min-w-0">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-1">
            Trading Dashboard
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm">
            Interactive charts, sentiment tracking, and global market statistics.
          </p>
        </div>

        {/* Coin Search */}
        <div ref={dropdownRef} className="relative w-full sm:w-72 md:w-80 z-30">
          <div className="glass-card rounded-2xl p-2.5 flex items-center gap-2 focus-within:border-gold/50 transition-all">
            <HiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary ml-1 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="flex-1 bg-transparent text-sm sm:text-sm text-text-primary outline-none border-none placeholder-text-secondary min-w-0"
            />
            {activeCoin && (
              <div className="flex items-center gap-1.5 bg-surface-secondary px-2 py-1 rounded-xl border border-glass-border flex-shrink-0">
                <img src={activeCoin.image} alt="" className="w-4 h-4 rounded-full" />
                <span className="text-[9px] font-bold text-text-primary uppercase font-mono">
                  {activeCoin.symbol}
                </span>
                <HiChevronDown className="w-3 h-3 text-text-secondary" />
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 glass shadow-2xl rounded-2xl overflow-hidden border border-glass-border max-h-72 overflow-y-auto scrollbar-thin z-50">
              {filteredCoins.length === 0 ? (
                <div className="p-4 text-center text-xs text-text-secondary">No coins found</div>
              ) : (
                filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => {
                      setActiveCoinId(coin.id);
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-glass-hover transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={coin.image} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-text-primary block truncate">
                          {coin.name}
                        </span>
                        <span className="text-[9px] text-text-secondary uppercase font-mono">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <span className="text-xs font-mono font-bold text-text-primary block">
                        ${coin.current_price?.toLocaleString()}
                      </span>
                      <span
                        className={`text-[9px] font-bold ${
                          coin.price_change_percentage_24h >= 0 ? "text-signal-green" : "text-signal-red"
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: Chart + Widgets */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Quick Select Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-4 sm:mx-0 px-4 sm:px-0">
            <span className="text-[10px] sm:text-xs font-medium text-text-secondary uppercase tracking-widest mr-1 sm:mr-2 flex-shrink-0">
              Quick view:
            </span>
            {quickSelectCoins.map((c) => {
              const active = c.id === activeCoinId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCoinId(c.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-gold text-black shadow-md border border-gold"
                      : "bg-surface-secondary/40 text-text-secondary border border-glass-border hover:text-text-primary hover:border-gold/30"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Chart */}
          <section>
            <CustomChart coinId={activeCoin.id} coinName={activeCoin.name} />
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <QuickConverter activeCoin={activeCoin} />
            <LiveOrderBook />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-6">
          <MarketSentiment />
          <MarketShare />
          <div className="sm:col-span-2 lg:col-span-1">
            <DashboardWatchlist activeCoinId={activeCoinId} onSelectCoinId={setActiveCoinId} />
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <section className="border-t border-glass-border pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <HiOutlineTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
          <h2 className="font-display text-lg sm:text-xl font-bold text-text-primary">
            Market capitalization stats
          </h2>
        </div>
        <GlobalStats />
      </section>

      {/* Trending Coins */}
      <section className="border-t border-glass-border pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <HiFire className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-pulse" />
          <h2 className="font-display text-lg sm:text-xl font-bold text-text-primary">
            Trending coins right now
          </h2>
        </div>
        <TrendingCoins />
      </section>

      {/* Gainers & Losers */}
      <section className="border-t border-glass-border pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className="flex gap-1.5">
            <HiArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-signal-green" />
            <HiArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-signal-red" />
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-text-primary">
            Top gainers &amp; losers (24h)
          </h2>
        </div>
        <TopGainersLosers />
      </section>
    </motion.div>
  );
};

export default Dashboard;
