import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiTrendingUp, HiCurrencyDollar, HiChartBar, HiCube, HiArrowRight } from "react-icons/hi";
import SearchCoins from "../../components/searchCoins/SearchCoins";
import StatsCard from "../../components/StatsCard";
import AnimatedBackground from "../../components/AnimatedBackground";
import TypingEffect from "../../components/TypingEffect";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <AnimatedBackground />

      <section className="relative z-10 max-w-7xl mx-auto px-5 pt-16 pb-8 md:pt-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold mb-6"
            >
              <span className="live-dot active" />
              Live Market Data
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-gradient-gold">Today's Crypto</span>
              <br />
              <span className="text-text-primary/70">
                <TypingEffect text="Prices by Market Cap" speed={60} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              Expert insights, market trends, and practical guides to help you navigate the crypto landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors"
              >
                Market Overview <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/watchlist"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-primary text-sm hover:border-gold/30 transition-all"
              >
                My Watchlist
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="glass-card rounded-3xl p-8 animate-float">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                <HiCurrencyDollar className="w-32 h-32 text-gold/40" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          <StatsCard icon={<HiTrendingUp />} label="Market Cap" value="$2.4T" />
          <StatsCard icon={<HiChartBar />} label="24h Volume" value="$98.2B" />
          <StatsCard icon={<HiCube />} label="BTC Dominance" value="52.3%" />
          <StatsCard icon={<HiCurrencyDollar />} label="Active Coins" value="12,846" />
        </motion.div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-5 pb-20">
        <SearchCoins />
      </section>
    </motion.div>
  );
};

export default Home;
