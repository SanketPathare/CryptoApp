import { motion } from "framer-motion";
import { HiCurrencyDollar } from "react-icons/hi";
import Card from "../../components/Card/Card";

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="max-w-7xl mx-auto px-5 pt-28 pb-8 md:pt-36">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Grow Your Crypto With{" "}
              <span className="text-gradient-brand">CoinApp Premium</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl"
            >
              Complete toolset for effortlessly managing all your crypto, NFTs,
              and DeFi assets from one place. Data-based investment decisions at
              the right time.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 px-8 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
            >
              Start Free Trial
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="glass-card rounded-3xl p-8 animate-float">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                <HiCurrencyDollar className="w-40 h-40 text-gold/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Card />
    </motion.div>
  );
};

export default Pricing;
