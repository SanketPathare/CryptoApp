import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return;
    const subs = JSON.parse(localStorage.getItem("crypto-subscribers") || "[]");
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem("crypto-subscribers", JSON.stringify(subs));
    toast.success("Subscribed");
    e.target.reset();
  };

  return (
    <footer className="border-t border-rule bg-surface-secondary mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <svg className="w-5 h-5 text-text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2L15 9H9L12 2Z" fill="currentColor" />
                <path d="M12 22L9 15H15L12 22Z" fill="currentColor" />
                <path d="M2 12L9 9V15L2 12Z" fill="currentColor" />
                <path d="M22 12L15 15V9L22 12Z" fill="currentColor" />
                <circle cx="12" cy="12" r="3" fill="var(--color-spot)" />
              </svg>
              <h3 className="font-display text-base font-bold tracking-tight text-text-primary">
                Quantis Crypto
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Coin prices, watchlists, and portfolio tracking, updated from CoinGecko.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Markets
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/categories", label: "Categories" },
                { path: "/compare", label: "Compare" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-text-secondary hover:text-spot transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Tools
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/portfolio", label: "Portfolio" },
                { path: "/watchlist", label: "Watchlist" },
                { path: "/converter", label: "Converter" },
                { path: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-text-secondary hover:text-spot transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Connect
            </h4>
            <div className="flex gap-2 mb-5">
              {[
                { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-surface border border-rule text-text-secondary hover:border-spot hover:text-spot transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 min-w-0 bg-surface border border-rule rounded-md px-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:border-spot outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-text-primary text-surface text-sm font-semibold hover:bg-spot-deep transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} Quantis Crypto. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs flex items-center gap-1.5">
            Built by the Quantis team <HiHeart className="text-spot w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
