import { motion } from "framer-motion";
import GlobalStats from "../../components/GlobalStats";
import TrendingCoins from "../../components/TrendingCoins";
import TopGainersLosers from "../../components/TopGainersLosers";
import { HiFire, HiArrowUp, HiArrowDown } from "react-icons/hi";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-5 pt-24 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Market Overview
        </h1>
        <p className="text-text-secondary text-sm">
          Real-time global cryptocurrency market data
        </p>
      </motion.div>

      <section className="mb-10">
        <GlobalStats />
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <HiFire className="w-5 h-5 text-gold" />
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Trending Coins
          </h2>
        </div>
        <TrendingCoins />
      </section>

      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-1">
            <HiArrowUp className="w-5 h-5 text-signal-green" />
            <HiArrowDown className="w-5 h-5 text-signal-red" />
          </div>
          <h2 className="font-display text-xl font-semibold text-text-primary">
            Top Gainers &amp; Losers (24h)
          </h2>
        </div>
        <TopGainersLosers />
      </section>
    </motion.div>
  );
};

export default Dashboard;
