import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-6MSxZs6y5R5mPUNufniP6FDg",
      },
    };
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then(setCoinData)
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`,
      options
    )
      .then((response) => response.json())
      .then(setHistoricalData)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (!coinData || !historicalData) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 rounded-full border-4 border-glass-border border-t-gold animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Market Cap Rank", value: `#${coinData.market_cap_rank}` },
    {
      label: "Current Price",
      value: `${currency.Symbol}${coinData.market_data.current_price[currency.name].toLocaleString()}`,
    },
    {
      label: "Market Cap",
      value: `${currency.Symbol}${coinData.market_data.market_cap[currency.name].toLocaleString()}`,
    },
    {
      label: "24h High",
      value: `${currency.Symbol}${coinData.market_data.high_24h[currency.name].toLocaleString()}`,
    },
    {
      label: "24h Low",
      value: `${currency.Symbol}${coinData.market_data.low_24h[currency.name].toLocaleString()}`,
    },
    {
      label: "24h Change",
      value: `${coinData.market_data.price_change_percentage_24h?.toFixed(2)}%`,
      color:
        coinData.market_data.price_change_percentage_24h > 0
          ? "text-signal-green"
          : "text-signal-red",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-5 pt-12 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 mb-12"
      >
        <img
          src={coinData.image.large}
          alt=""
          className="w-20 h-20 rounded-full"
        />
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
          {coinData.name}{" "}
          <span className="text-text-secondary font-mono text-xl">
            ({coinData.symbol.toUpperCase()})
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 md:p-6 mb-8"
      >
        <div className="h-[250px] md:h-[300px]">
          <LineChart historicalData={historicalData} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2">
              {stat.label}
            </p>
            <p
              className={`font-display text-xl font-semibold ${
                stat.color || "text-text-primary"
              }`}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Coins;
