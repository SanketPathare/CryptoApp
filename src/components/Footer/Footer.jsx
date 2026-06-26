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
    <footer className="border-t border-glass-border bg-surface-secondary/40 backdrop-blur-md mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="transition-transform duration-300 hover:scale-110 hover:rotate-[-5deg]">
                <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 9H9L12 2Z" fill="currentColor" />
                  <path d="M12 22L9 15H15L12 22Z" fill="currentColor" />
                  <path d="M2 12L9 9V15L2 12Z" fill="currentColor" />
                  <path d="M22 12L15 15V9L22 12Z" fill="currentColor" />
                  <circle cx="12" cy="12" r="3" fill="#06B6D4" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight text-text-primary">
                Quantis <span className="text-[#10B981]">Crypto.</span>
              </h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Real-time cryptocurrency tracking and portfolio management. Stay ahead of the market with live data and insights.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-widest mb-4">
              Markets
            </h4>
            <ul className="space-y-2.5">
              {[
                { path: "/", label: "Home" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/categories", label: "Categories" },
                { path: "/compare", label: "Compare" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary hover:text-gold transition-colors duration-200 text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-widest mb-4">
              Tools
            </h4>
            <ul className="space-y-2.5">
              {[
                { path: "/portfolio", label: "Portfolio" },
                { path: "/watchlist", label: "Watchlist" },
                { path: "/converter", label: "Converter" },
                { path: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary hover:text-gold transition-colors duration-200 text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-2.5 mb-6">
              {[
                { icon: FaGithub, href: "https://github.com" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaDiscord, href: "https://discord.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-glass border border-glass-border text-text-secondary hover:border-[#10B981]/30 hover:text-gold transition-all duration-350"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <form onSubmit={handleSubscribe} className="bg-glass border border-glass-border rounded-full p-1 flex">
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-base md:text-xs text-text-primary placeholder-text-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-black text-xs font-bold hover:brightness-110 shadow-lg shadow-[#10B981]/20 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-[10px]">
            &copy; {new Date().getFullYear()} Quantis CryptoApp. All rights reserved.
          </p>
          <p className="text-text-secondary text-[10px] flex items-center gap-1">
            Made with <HiHeart className="text-signal-red w-3 h-3" /> by Quantis team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
