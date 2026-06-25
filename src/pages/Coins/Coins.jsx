import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../components/LineChart/LineChart";
import TimeFrameSelector from "../../components/TimeFrameSelector";
import FavoritesButton from "../../components/FavoritesButton";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(7);
  const { currency } = useContext(CoinContext);

  const API_KEY = "CG-6MSxZs6y5R5mPUNufniP6FDg";
  const headers = { accept: "application/json", "x-cg-demo-api-key": API_KEY };

  const fetchCoinData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&community_data=false&developer_data=false`,
        { headers }
      );
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}`,
        { headers }
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

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

  const additionalStats = [
    {
      label: "All-Time High",
      value: `${currency.Symbol}${coinData.market_data.ath[currency.name]?.toLocaleString()}`,
    },
    {
      label: "ATH Change %",
      value: `${coinData.market_data.ath_change_percentage[currency.name]?.toFixed(2)}%`,
      color:
        coinData.market_data.ath_change_percentage[currency.name] > 0
          ? "text-signal-green"
          : "text-signal-red",
    },
    {
      label: "Circulating Supply",
      value: coinData.market_data.circulating_supply?.toLocaleString(),
    },
    {
      label: "Total Supply",
      value: coinData.market_data.total_supply?.toLocaleString() || "N/A",
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
        className="flex flex-col md:flex-row items-center gap-4 mb-8"
      >
        <img src={coinData.image.large} alt="" className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <h1 className="font-display text-2xl md:text-4xl font-bold text-text-primary">
              {coinData.name}
            </h1>
            <span className="font-mono text-sm md:text-xl text-text-secondary">
              ({coinData.symbol.toUpperCase()})
            </span>
            <FavoritesButton coinId={coinData.id} coinName={coinData.name} />
          </div>
          {coinData.description?.en && (
            <p className="text-text-secondary text-xs md:text-sm mt-2 line-clamp-2 max-w-2xl">
              {coinData.description.en.replace(/<[^>]*>/g, "").slice(0, 200)}...
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 md:p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <TimeFrameSelector selected={days} onChange={setDays} />
          {coinData.market_data.price_change_percentage_24h > 0 ? (
            <span className="text-signal-green text-sm font-semibold flex items-center gap-1">
              &uarr; +{coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
            </span>
          ) : (
            <span className="text-signal-red text-sm font-semibold flex items-center gap-1">
              &darr; {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
            </span>
          )}
        </div>
        <div className="h-[250px] md:h-[300px]">
          <LineChart historicalData={historicalData} />
        </div>
      </motion.div>

      <motion.div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <p className={`font-display text-lg md:text-xl font-semibold ${stat.color || "text-text-primary"}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i }}
              className="glass-card rounded-2xl p-4"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-1">
                {stat.label}
              </p>
              <p className={`font-mono text-sm font-semibold ${stat.color || "text-text-primary"}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {coinData.links?.homepage?.[0] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2">Links</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={coinData.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl px-4 py-2 text-xs text-gold hover:border-gold/30 transition-all"
              >
                Website
              </a>
              {coinData.links?.blockchain_site?.slice(0, 3).filter(Boolean).map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl px-4 py-2 text-xs text-text-secondary hover:text-gold hover:border-gold/30 transition-all"
                >
                  Explorer {i + 1}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Coins;
