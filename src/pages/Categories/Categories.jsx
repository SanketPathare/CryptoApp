import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { CoinContext } from "../../context/coinContext";
import CategoryCard from "../../components/CategoryCard";

const Categories = () => {
  const { categories } = useContext(CoinContext);
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-5 pt-24 pb-20"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Categories
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          Browse cryptocurrencies by category
        </p>
        <div className="glass-card rounded-2xl p-2 flex items-center gap-3 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none px-3 placeholder-text-secondary"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-text-secondary">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Categories;
