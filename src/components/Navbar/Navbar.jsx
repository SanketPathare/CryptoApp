import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import { HiMenu } from "react-icons/hi";
import ThemeToggle from "../ThemeToggle";
import MobileMenu from "../MobileMenu";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/pricing", label: "Pricing" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currencyHandler = (event) => {
    const map = {
      usd: { name: "usd", Symbol: "$" },
      inr: { name: "inr", Symbol: "₹" },
      eur: { name: "eur", Symbol: "€" },
    };
    setCurrency(map[event.target.value] || map.usd);
  };

  return (
    <>
      <nav className="sticky top-0 z-30 glass backdrop-blur-xl border-b border-glass-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-4">
          <Link to="/" className="group">
            <h2 className="font-display text-2xl font-bold text-gradient-gold tracking-wider">
              Crypto.
            </h2>
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-gold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/watchlist"
                className={`relative text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                  location.pathname === "/watchlist"
                    ? "text-gold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Watchlist
                {location.pathname === "/watchlist" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <select
              onChange={currencyHandler}
              className="py-2 px-3 rounded-xl glass text-xs text-text-primary border border-glass-border focus:border-gold/50 focus:outline-none cursor-pointer appearance-none bg-transparent"
            >
              <option value="usd" className="bg-surface text-text-primary">USD</option>
              <option value="inr" className="bg-surface text-text-primary">INR</option>
              <option value="eur" className="bg-surface text-text-primary">EUR</option>
            </select>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl glass hover:border-gold/30 transition-all cursor-pointer"
              aria-label="Open menu"
            >
              <HiMenu className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;
