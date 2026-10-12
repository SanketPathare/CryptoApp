import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiCopy, FiCheck } from "react-icons/fi";
import { CoinContext } from "../../context/coinContext";
import SearchCoins from "../../components/searchCoins/SearchCoins";
import StatsCard from "../../components/StatsCard";
import MarketBoard from "../../components/MarketBoard";
import TrendingCoins from "../../components/TrendingCoins";
import { toast } from "react-toastify";

const WalletGenerator = () => {
  const [wallet, setWallet] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateKeys = () => {
    setGenerating(true);
    setWallet(null);
    setTimeout(() => {
      const publicAddr =
        "0x" +
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join("") +
        "..." +
        Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setWallet({ address: publicAddr });
      setGenerating(false);
      toast.success("Keys generated");
    }, 1500);
  };

  const copyAddress = () => {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 2000);
  };

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <div className="w-5 h-5 border-2 border-spot border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-text-secondary">Generating keys…</span>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <button
          onClick={generateKeys}
          className="px-4 py-2 rounded-md bg-text-primary text-surface text-xs font-semibold hover:bg-spot-deep transition-colors cursor-pointer"
        >
          Generate keys
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-secondary">Sandbox address</span>
        <button
          onClick={copyAddress}
          aria-label="Copy address"
          className="text-text-secondary hover:text-spot transition-colors cursor-pointer"
        >
          {copied ? <FiCheck className="w-3.5 h-3.5 text-up" /> : <FiCopy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <p className="font-mono text-xs text-text-primary bg-tint border border-rule rounded px-2.5 py-2 select-all break-all">
        {wallet.address}
      </p>
      <div className="flex items-center gap-2 text-xs text-text-secondary border border-rule rounded px-2.5 py-2">
        <span className="live-dot active" />
        Wallet ready
      </div>
    </div>
  );
};

const BlockMiner = () => {
  const [blocks, setBlocks] = useState([
    { height: 18482901, txs: 142, hash: "0x3a2f...1b9c", time: "2s ago" },
    { height: 18482900, txs: 98, hash: "0x7e8c...4a2d", time: "6s ago" },
  ]);
  const [hashrate, setHashrate] = useState(482.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const nextHeight = prev[0].height + 1;
        const newBlock = {
          height: nextHeight,
          txs: Math.floor(Math.random() * 180) + 40,
          hash:
            "0x" +
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join("") +
            "..." +
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
          time: "just now",
        };
        const updated = prev.map((b, idx) => ({
          ...b,
          time: idx === 0 ? "4s ago" : idx === 1 ? "8s ago" : `${(idx + 1) * 4}s ago`,
        }));
        return [newBlock, ...updated].slice(0, 2);
      });
      setHashrate((prev) => +(prev + (Math.random() - 0.5) * 8).toFixed(1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2.5 font-mono text-xs">
      <div className="flex justify-between items-center text-text-secondary border-b border-rule pb-2">
        <span>
          Hashrate <span className="text-spot tnum">{hashrate} TH/s</span>
        </span>
        <span>
          Gas <span className="text-brand-secondary tnum">14 Gwei</span>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {blocks.map((b) => (
          <div
            key={b.height}
            className="flex justify-between items-center gap-2 bg-tint border border-rule rounded px-2.5 py-2"
          >
            <span className="text-text-primary font-medium tnum">#{b.height}</span>
            <span className="text-text-secondary tnum">{b.txs} txs</span>
            <span className="text-text-secondary hidden sm:inline lg:inline truncate">{b.hash}</span>
            <span className="text-spot tnum">{b.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const toolCard = "border border-rule rounded-md bg-glass p-5 flex flex-col";

const Home = () => {
  const { globalData } = useContext(CoinContext);

  const fmtMoney = (n) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    return `$${Math.round(n).toLocaleString()}`;
  };

  const stats = [
    { label: "Market cap", value: globalData ? fmtMoney(globalData.market_cap) : "—" },
    { label: "24h volume", value: globalData ? fmtMoney(globalData.total_volume) : "—" },
    {
      label: "BTC dominance",
      value: globalData?.market_cap_percentage?.btc
        ? `${globalData.market_cap_percentage.btc.toFixed(1)}%`
        : "—",
    },
    {
      label: "Active coins",
      value: globalData?.active_cryptocurrencies
        ? globalData.active_cryptocurrencies.toLocaleString()
        : "—",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero: headline left, live board right, board runs to the edge */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-[26rem_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[0.95] tracking-tight text-text-primary">
              The whole market, on one page.
            </h1>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-[38ch]">
              Prices, moves, and market caps for the top 50 coins, updated from
              CoinGecko — with your watchlist and portfolio kept beside them.
            </p>
            <Link
              to="/dashboard"
              className="mt-7 inline-flex items-center px-5 py-3 rounded-md bg-text-primary text-surface text-sm font-semibold hover:bg-spot-deep transition-colors"
            >
              Open the dashboard
            </Link>
          </div>

          <div className="lg:-mr-8 xl:mr-[calc(-2rem_+_max(0px,100vw_-_80rem)/-2)]">
            <MarketBoard />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <div className={toolCard}>
            <h3 className="font-display text-lg font-bold text-text-primary">Trending right now</h3>
            <p className="text-sm text-text-secondary mt-1.5 mb-4">
              What other traders are searching for, straight from CoinGecko.
            </p>
            <TrendingCoins />
          </div>

          <div className={toolCard}>
            <h3 className="font-display text-lg font-bold text-text-primary">Generate a wallet</h3>
            <p className="text-sm text-text-secondary mt-1.5 mb-4">
              Create a sandbox address and copy it — no extension needed.
            </p>
            <WalletGenerator />
          </div>

          <div className={toolCard}>
            <h3 className="font-display text-lg font-bold text-text-primary">Watch blocks arrive</h3>
            <p className="text-sm text-text-secondary mt-1.5 mb-4">
              Block height, transactions, and gas, refreshed every few seconds.
            </p>
            <BlockMiner />
          </div>
        </div>
      </section>

      {/* Price table */}
      <section id="prices" className="max-w-7xl mx-auto px-5 md:px-8 border-t border-rule pt-12 md:pt-14 pb-4">
        <div className="flex items-baseline justify-between flex-wrap gap-x-6 gap-y-2 mb-7">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
            Cryptocurrency prices by market cap
          </h2>
          <p className="text-xs text-text-secondary">Updated from CoinGecko</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule rounded-md overflow-hidden mb-10">
          {stats.map((stat) => (
            <StatsCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <SearchCoins />
      </section>
    </div>
  );
};

export default Home;
