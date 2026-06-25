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
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <footer className="border-t border-glass-border mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-bold text-gradient-gold mb-4">
              Crypto.
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Real-time cryptocurrency tracking and portfolio management. Stay ahead of the market with live data and insights.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-medium text-text-primary uppercase tracking-widest mb-4">
              Markets
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/categories", label: "Categories" },
                { path: "/compare", label: "Compare" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-medium text-text-primary uppercase tracking-widest mb-4">
              Tools
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/portfolio", label: "Portfolio" },
                { path: "/watchlist", label: "Watchlist" },
                { path: "/converter", label: "Converter" },
                { path: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-medium text-text-primary uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: FaGithub, href: "https://github.com" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaDiscord, href: "https://discord.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:border-gold/30 hover:text-gold transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <form onSubmit={handleSubscribe} className="glass rounded-xl p-1 flex">
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm text-text-primary placeholder-text-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gold text-black text-sm font-semibold hover:bg-gold-dark transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs">
            &copy; {new Date().getFullYear()} CryptoApp. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs flex items-center gap-1">
            Made with <HiHeart className="text-signal-red w-3 h-3" /> by CryptoApp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
