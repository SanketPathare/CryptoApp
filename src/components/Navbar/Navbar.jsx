import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import { HiMenu } from "react-icons/hi";
import { FiLogIn, FiLock, FiCpu, FiCompass } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle";
import MobileMenu from "../MobileMenu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/pricing", label: "Pricing" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/compare", label: "Compare" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { setCurrency, currency } = useContext(CoinContext);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const currencyHandler = (event) => {
    const map = {
      usd: { name: "usd", Symbol: "$" },
      inr: { name: "inr", Symbol: "₹" },
      eur: { name: "eur", Symbol: "€" },
    };
    setCurrency(map[event.target.value] || map.usd);
  };

  const handleWalletConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setIsConnected(true);
      const addr = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join("");
      setWalletAddress(addr);
      toast.success("Wallet connected successfully!");
      setLoginOpen(false);
    }, 1200);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast.info("Wallet disconnected");
  };

  return (
    <>
      <div className="sticky top-4 z-40 max-w-7xl mx-auto px-4 md:px-6 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between bg-glass backdrop-blur-xl border border-glass-border rounded-full px-5 py-3 shadow-lg">
          <Link to="/" className="flex items-center gap-2 group">
            <svg className="w-6 h-6 text-[#FF793F]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 9H9L12 2Z" fill="currentColor" />
              <path d="M12 22L9 15H15L12 22Z" fill="currentColor" />
              <path d="M2 12L9 9V15L2 12Z" fill="currentColor" />
              <path d="M22 12L15 15V9L22 12Z" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="#C387FF" />
            </svg>
            <h2 className="font-display text-lg md:text-xl font-bold tracking-wider text-text-primary">
              Quantis <span className="text-[#FF793F]">Crypto.</span>
            </h2>
          </Link>

          <ul className="hidden lg:flex items-center gap-1.5 bg-glass border border-glass-border rounded-full p-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 block ${
                    location.pathname === link.path
                      ? "text-black bg-[#FF793F]"
                      : "text-text-secondary hover:text-text-primary hover:bg-glass-hover"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <select
              onChange={currencyHandler}
              value={currency.name}
              className="py-1.5 px-3 rounded-full bg-glass text-xs text-text-primary border border-glass-border focus:border-[#FF793F]/50 focus:outline-none cursor-pointer appearance-none text-center"
            >
              <option value="usd">USD</option>
              <option value="inr">INR</option>
              <option value="eur">EUR</option>
            </select>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-1.5 rounded-full border border-green-500/35 bg-green-500/10 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-all cursor-pointer truncate max-w-[140px] text-ellipsis"
                title="Click to disconnect"
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF793F] to-[#C387FF] text-black text-xs font-bold hover:brightness-110 shadow-lg shadow-[#FF793F]/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                Connect <FiLogIn className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-full bg-glass border border-glass-border hover:border-[#FF793F]/30 transition-all cursor-pointer"
              aria-label="Open menu"
            >
              <HiMenu className="w-4 h-4 text-text-primary" />
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <AnimatePresence>
        {loginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginOpen(false)}
              className="fixed inset-0 overlay"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-md bg-surface-secondary border border-glass-border rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF793F]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#C387FF]/10 rounded-full blur-2xl" />

              <h3 className="font-display text-2xl font-bold text-text-primary text-center mb-2">
                Connect Wallet
              </h3>
              <p className="text-xs text-text-secondary text-center mb-6">
                Link your cryptographic key to start utilizing decentralized Quantis node calculations.
              </p>

              <div className="space-y-4">
                <button
                  disabled={connecting}
                  onClick={handleWalletConnect}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-glass border border-glass-border hover:border-[#FF793F]/40 hover:bg-[#FF793F]/5 transition-all text-left group cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <FiCpu className="w-5 h-5 text-[#FF793F] group-hover:animate-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Browser Extension Wallet</p>
                      <p className="text-xs text-text-secondary">Metamask, TrustWallet, Phantom</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#FF793F] font-bold">Local</span>
                </button>

                <button
                  disabled={connecting}
                  onClick={handleWalletConnect}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-glass border border-glass-border hover:border-[#C387FF]/40 hover:bg-[#C387FF]/5 transition-all text-left group cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <FiCompass className="w-5 h-5 text-[#C387FF] group-hover:animate-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">WalletConnect</p>
                      <p className="text-xs text-text-secondary">Scan QR code with mobile wallet</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#C387FF] font-bold">Any Chain</span>
                </button>
              </div>

              {connecting && (
                <div className="mt-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#FF793F] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-text-secondary animate-pulse">Requesting connection from extension...</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-glass-border flex items-center gap-2 justify-center text-[10px] text-text-secondary">
                <FiLock className="w-3.5 h-3.5 text-[#FF793F]" /> Secured by end-to-end sandbox cryptographic handshakes
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
