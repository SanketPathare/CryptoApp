import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiTrendingUp, HiCurrencyDollar, HiChartBar, HiCube, HiArrowRight } from "react-icons/hi";
import { FiKey, FiCopy, FiCheck, FiCpu, FiLayers } from "react-icons/fi";
import SearchCoins from "../../components/searchCoins/SearchCoins";
import StatsCard from "../../components/StatsCard";
import TypingEffect from "../../components/TypingEffect";
import TiltCard from "../../components/TiltCard";
import { toast } from "react-toastify";

// Card 1: Network Graph animation
const NetworkGraph = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden bg-glass rounded-2xl border border-glass-border mt-4">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,121,63,0.3)] border border-glass-border"
      >
        <span className="text-[10px] font-bold text-black uppercase tracking-wider">Quantis</span>
      </motion.div>

      {[
        { name: "T", delay: 0, x: -70, y: -25, color: "#34d399" },
        { name: "ETH", delay: 0.8, x: 70, y: -20, color: "#06B6D4" },
        { name: "X", delay: 1.6, x: 0, y: 45, color: "#10B981" }
      ].map((node, i) => (
        <div key={node.name} className="absolute">
          <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0, width: 2, height: 2 }}>
            <motion.line
              x1={0}
              y1={0}
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth={1}
              strokeOpacity={0.25}
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </svg>

          <motion.div
            animate={{
              y: [0, -5, 0],
              x: [0, 2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i,
              delay: node.delay,
              ease: "easeInOut"
            }}
            style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
            className="w-8 h-8 rounded-full bg-surface-secondary/60 border border-glass-border flex items-center justify-center shadow-lg"
          >
            <span className="text-[9px] font-bold text-text-primary">{node.name}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// Card 2: Wallet key generation simulator
const WalletGenerator = () => {
  const [wallet, setWallet] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateKeys = () => {
    setGenerating(true);
    setWallet(null);
    setTimeout(() => {
      const publicAddr = "1x1391" + Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join("") + "...q8i12";
      setWallet({ address: publicAddr });
      setGenerating(false);
      toast.success("Cryptographic keys generated!");
    }, 1500);
  };

  const copyAddress = () => {
    if (!wallet) return;
    navigator.clipboard.writeText("1x139174f8263e8a9bc019dfd71c828282828q8i12");
    setCopied(true);
    toast.success("Wallet address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-glass border border-glass-border rounded-2xl p-4 mt-4 text-left flex flex-col gap-3 min-h-[160px] justify-between">
      {!wallet && !generating ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <FiKey className="w-7 h-7 text-[#10B981] mb-3 animate-pulse" />
          <button
            onClick={generateKeys}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-black font-bold text-[10px] uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Generate Keys
          </button>
        </div>
      ) : generating ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <div className="w-5 h-5 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] text-text-secondary animate-pulse">Running keygen sequence...</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest">Crypto Address</span>
              <button onClick={copyAddress} className="text-text-secondary hover:text-[#10B981] transition-colors cursor-pointer">
                {copied ? <FiCheck className="w-3.5 h-3.5 text-green-400" /> : <FiCopy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="font-mono text-xs text-text-primary bg-glass border border-glass-border rounded-lg px-2.5 py-2 select-all">
              {wallet.address}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-green-400 bg-green-500/5 border border-green-500/10 rounded-lg p-2">
            <span className="live-dot active" />
            <span className="font-mono uppercase tracking-wider">Wallet Ready to Sync</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Card 3: Blockchain mock block miner
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
          hash: "0x" + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join("") + "..." + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join(""),
          time: "just now",
        };
        const updated = prev.map((b, idx) => ({
          ...b,
          time: idx === 0 ? "4s ago" : idx === 1 ? "8s ago" : `${(idx+1)*4}s ago`,
        }));
        return [newBlock, ...updated].slice(0, 2);
      });
      setHashrate((prev) => +(prev + (Math.random() - 0.5) * 8).toFixed(1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-glass border border-glass-border rounded-2xl p-4 mt-4 text-left flex flex-col gap-3.5 min-h-[160px] justify-between font-mono text-[9px]">
      <div className="flex justify-between items-center text-text-secondary border-b border-glass-border pb-1.5">
        <span>Hashrate: <span className="text-[#10B981]">{hashrate} TH/s</span></span>
        <span>Gas: <span className="text-[#06B6D4]">14 Gwei</span></span>
      </div>

      <div className="space-y-1.5">
        {blocks.map((b) => (
          <div key={b.height} className="flex justify-between items-center bg-glass border border-glass-border rounded-lg p-2">
            <span className="text-text-primary font-bold">#{b.height}</span>
            <span className="text-text-secondary">{b.txs} txs</span>
            <span className="text-text-secondary">{b.hash}</span>
            <span className="text-[#10B981]">{b.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-x-hidden"
    >
      <section className="relative z-10 max-w-7xl mx-auto px-5 pt-20 pb-8 md:pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-glass border border-glass-border rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10B981] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          BEST BLOCKCHAIN 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-text-primary mb-6 max-w-5xl mx-auto"
        >
          Redefining the Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#06B6D4]">Crypto</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#06B6D4]">Fintech</span> Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Bridging cutting-edge technology and financial innovation, our next-generation crypto and fintech solutions empower users with greater control, security, and efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col items-center gap-3 mb-20"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Join Now!</span>
          <button
            onClick={() => {
              document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-14 h-14 rounded-full bg-glass border border-glass-border hover:border-[#10B981]/40 flex items-center justify-center text-text-primary hover:text-[#10B981] hover:bg-[#10B981]/5 shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <HiArrowRight className="w-5 h-5 rotate-45 group-hover:rotate-[135deg] transition-all duration-300" />
          </button>
        </motion.div>

        {/* Triple Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            <TiltCard disabled={isMobile} className="h-full">
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Trade with trust and assurance</h3>
                  <p className="text-xs text-text-secondary">Assured that you maintain full authority</p>
                </div>
                <NetworkGraph />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-full"
          >
            <TiltCard disabled={isMobile} className="h-full">
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Create your own personal crypto wallet</h3>
                  <p className="text-xs text-text-secondary">Secure keys generated straight inside the sandbox</p>
                </div>
                <WalletGenerator />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-full"
          >
            <TiltCard disabled={isMobile} className="h-full">
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Join The Blockchain System</h3>
                  <p className="text-xs text-text-secondary">Securely broadcast and watch blocks mined in real-time</p>
                </div>
                <BlockMiner />
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Global stats section */}
        <div className="border-t border-glass-border pt-16" id="search-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10B981] mb-3">
              <span className="live-dot active" />
              Live Market Data
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary mt-4">
              Cryptocurrency Prices by Market Cap
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <StatsCard icon={<HiTrendingUp />} label="Market Cap" value="$2.4T" />
            <StatsCard icon={<HiChartBar />} label="24h Volume" value="$98.2B" />
            <StatsCard icon={<HiCube />} label="BTC Dominance" value="52.3%" />
            <StatsCard icon={<HiCurrencyDollar />} label="Active Coins" value="12,846" />
          </motion.div>

          <SearchCoins />
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
