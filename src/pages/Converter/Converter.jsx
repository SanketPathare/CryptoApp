import { motion } from "framer-motion";
import CoinConverter from "../../components/CoinConverter";

const Converter = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-5 pt-12 pb-20"
    >
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
          Crypto Converter
        </h1>
        <p className="text-text-secondary text-sm">
          Convert between any cryptocurrencies in real time
        </p>
      </div>
      <CoinConverter />
    </motion.div>
  );
};

export default Converter;
