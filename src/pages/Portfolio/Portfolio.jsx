import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PortfolioCard from "../../components/PortfolioCard";
import PortfolioForm from "../../components/PortfolioForm";
import { HiPlus, HiBriefcase } from "react-icons/hi";

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadHoldings = () => {
    try {
      setHoldings(JSON.parse(localStorage.getItem("crypto-portfolio") || "[]"));
    } catch {
      setHoldings([]);
    }
  };

  useEffect(() => {
    loadHoldings();
  }, []);

  const handleDelete = (id) => {
    const updated = holdings.filter((h) => h.id !== id);
    localStorage.setItem("crypto-portfolio", JSON.stringify(updated));
    setHoldings(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-5 pt-12 pb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Portfolio
          </h1>
          <p className="text-text-secondary text-sm">
            Track your cryptocurrency holdings
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
        >
          <HiPlus className="w-4 h-4" />
          Add Coin
        </button>
      </div>

      {holdings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <HiBriefcase className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-text-primary mb-2">Empty Portfolio</h3>
          <p className="text-text-secondary text-sm mb-6">
            Start tracking your crypto holdings by adding your first coin.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Coin
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {holdings.map((h) => (
            <PortfolioCard key={h.id} holding={h} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && <PortfolioForm onClose={() => { setShowForm(false); loadHoldings(); }} />}
    </motion.div>
  );
};

export default Portfolio;
