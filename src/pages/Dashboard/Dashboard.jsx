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

const Dashboard = () => {
  const { allCoin } = useContext(CoinContext);
  const [activeCoinId, setActiveCoinId] = useState("bitcoin");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
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

  // Find active coin details
  const activeCoin = allCoin.find((c) => c.id === activeCoinId) || allCoin[0];

  // Quick Select Coin Pills
  const quickSelectCoins = [
    { id: "bitcoin", name: "BTC" },
    { id: "ethereum", name: "ETH" },
    { id: "solana", name: "SOL" },
    { id: "cardano", name: "ADA" },
    { id: "dogecoin", name: "DOGE" },
    { id: "ripple", name: "XRP" },
  ];

  // Filter coins for custom dropdown search
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
      className="max-w-7xl mx-auto px-5 pt-24 pb-20 space-y-8"
    >
      {/* Top Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-1">
            Trading Dashboard
          </h1>
          <p className="text-text-secondary text-sm">
            Interactive charts, sentiment tracking, and global market statistics.
          </p>
        </div>

        {/* Custom Coin Search Dropdown */}
        <div ref={dropdownRef} className="relative w-full md:w-80 z-30">
          <div className="glass-card rounded-2xl p-2.5 flex items-center gap-3 focus-within:border-gold/50 transition-all">
            <HiSearch className="w-5 h-5 text-text-secondary ml-1" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="flex-1 bg-transparent text-base md:text-sm text-text-primary outline-none border-none placeholder-text-secondary"
            />
            {activeCoin && (
              <div className="flex items-center gap-1.5 bg-surface-secondary px-2.5 py-1 rounded-xl border border-glass-border">
                <img src={activeCoin.image} alt="" className="w-4.5 h-4.5 rounded-full" />
                <span className="text-[10px] font-bold text-text-primary uppercase font-mono">
                  {activeCoin.symbol}
                </span>
                <HiChevronDown className="w-3 h-3 text-text-secondary" />
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 glass shadow-2xl rounded-2xl overflow-hidden border border-glass-border max-h-60 overflow-y-auto scrollbar-thin z-50">
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
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt="" className="w-6 h-6 rounded-full" />
                      <div>
                        <span className="text-xs font-semibold text-text-primary block">
                          {coin.name}
                        </span>
                        <span className="text-[9px] text-text-secondary uppercase font-mono">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
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

      {/* Main Grid: Columns 1 on Mobile, 3 on Large Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Graph + Action widgets (spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Select pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest mr-2 flex-shrink-0">
              Quick view:
            </span>
            {quickSelectCoins.map((c) => {
              const active = c.id === activeCoinId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCoinId(c.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
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

          {/* Core Custom Interactive Graph */}
          <section>
            <CustomChart coinId={activeCoin.id} coinName={activeCoin.name} />
          </section>

          {/* Quick Action Grid: Converter + Live Order book */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickConverter activeCoin={activeCoin} />
            <LiveOrderBook />
          </div>
        </div>

        {/* Right Side: Sentiment, Market cap Donut, Watchlist (spans 1 column) */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:flex lg:flex-col lg:space-y-6">
          <MarketSentiment />
          <MarketShare />
          <div className="md:col-span-2 lg:col-span-1">
            <DashboardWatchlist activeCoinId={activeCoinId} onSelectCoinId={setActiveCoinId} />
          </div>
        </div>
      </div>

      {/* Global stats section */}
      <section className="border-t border-glass-border pt-8">
        <div className="flex items-center gap-2 mb-5">
          <HiOutlineTrendingUp className="w-5 h-5 text-gold" />
          <h2 className="font-display text-xl font-bold text-text-primary">
            Market capitalization stats
          </h2>
        </div>
        <GlobalStats />
      </section>

      {/* Trending Coins Slider Section */}
      <section className="border-t border-glass-border pt-8">
        <div className="flex items-center gap-2 mb-5">
          <HiFire className="w-5 h-5 text-gold animate-pulse" />
          <h2 className="font-display text-xl font-bold text-text-primary">
            Trending coins right now
          </h2>
        </div>
        <TrendingCoins />
      </section>

      {/* Gainers & Losers Section */}
      <section className="border-t border-glass-border pt-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-1.5">
            <HiArrowUp className="w-5 h-5 text-signal-green" />
            <HiArrowDown className="w-5 h-5 text-signal-red" />
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Top gainers &amp; losers (24h)
          </h2>
        </div>
        <TopGainersLosers />
      </section>
    </motion.div>
  );
};

export default Dashboard;
