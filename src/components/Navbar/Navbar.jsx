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
      toast.success("Wallet connected");
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
      <header className="sticky top-0 z-40 bg-surface border-b border-rule">
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <svg className="w-6 h-6 text-text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2L15 9H9L12 2Z" fill="currentColor" />
              <path d="M12 22L9 15H15L12 22Z" fill="currentColor" />
              <path d="M2 12L9 9V15L2 12Z" fill="currentColor" />
              <path d="M22 12L15 15V9L22 12Z" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="var(--color-spot)" />
            </svg>
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
              Quantis Crypto
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium py-1 border-b-2 transition-colors duration-150 block ${
                    location.pathname === link.path
                      ? "text-text-primary border-spot"
                      : "text-text-secondary border-transparent hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <select
              onChange={currencyHandler}
              value={currency.name}
              aria-label="Currency"
              className="py-1.5 px-2.5 rounded-md bg-surface-secondary text-sm text-text-primary border border-rule hover:border-spot focus:border-spot transition-colors cursor-pointer"
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
                className="px-3 py-1.5 rounded-md border border-rule bg-tint text-spot-deep text-sm font-semibold hover:bg-spot hover:text-surface transition-colors cursor-pointer truncate max-w-[110px] sm:max-w-[150px] text-ellipsis font-mono"
                title="Disconnect wallet"
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="px-4 py-2 rounded-md bg-text-primary text-surface text-sm font-semibold hover:bg-spot-deep transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Connect <FiLogIn className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md border border-rule hover:border-spot transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <HiMenu className="w-4 h-4 text-text-primary" />
            </button>
          </div>
        </nav>
      </header>

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
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-md bg-surface-secondary border border-rule rounded-lg p-6 md:p-8 shadow-[var(--shadow-elevation-3)] z-10"
            >
              <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                Connect wallet
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Pick where your keys live. Nothing leaves this browser sandbox.
              </p>

              <div className="space-y-3">
                <button
                  disabled={connecting}
                  onClick={handleWalletConnect}
                  className="w-full flex items-center justify-between p-4 rounded-md bg-surface border border-rule hover:border-spot hover:bg-tint transition-colors text-left cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <FiCpu className="w-5 h-5 text-spot" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Browser extension wallet</p>
                      <p className="text-xs text-text-secondary">MetaMask, TrustWallet, Phantom</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">Local</span>
                </button>

                <button
                  disabled={connecting}
                  onClick={handleWalletConnect}
                  className="w-full flex items-center justify-between p-4 rounded-md bg-surface border border-rule hover:border-spot hover:bg-tint transition-colors text-left cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <FiCompass className="w-5 h-5 text-brand-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">WalletConnect</p>
                      <p className="text-xs text-text-secondary">Scan a QR code with your mobile wallet</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">Any chain</span>
                </button>
              </div>

              {connecting && (
                <div className="mt-6 flex flex-col items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-spot border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-text-secondary">Waiting for your wallet to respond…</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-rule flex items-center gap-2 justify-center text-xs text-text-secondary">
                <FiLock className="w-3.5 h-3.5 text-spot" /> Keys stay in your browser
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
