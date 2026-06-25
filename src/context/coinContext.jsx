import { createContext, useEffect, useState, useCallback } from "react";

export const CoinContext = createContext();

const API_KEY = "CG-6MSxZs6y5R5mPUNufniP6FDg";
const BASE = "https://api.coingecko.com/api/v3";

const headers = {
  accept: "application/json",
  "x-cg-demo-api-key": API_KEY,
};

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [trending, setTrending] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [topGainersLosers, setTopGainersLosers] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", Symbol: "$" });

  const fetchAllCoin = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE}/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&sparkline=true`,
        { headers }
      );
      const data = await res.json();
      setAllCoin(data);
    } catch (err) {
      console.error("fetchAllCoin", err);
    }
  }, [currency]);

  const fetchTrending = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/search/trending`, { headers });
      const data = await res.json();
      setTrending(data.coins || []);
    } catch (err) {
      console.error("fetchTrending", err);
    }
  }, []);

  const fetchGlobal = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/global`, { headers });
      const data = await res.json();
      setGlobalData(data.data);
    } catch (err) {
      console.error("fetchGlobal", err);
    }
  }, []);

  const fetchTopGainersLosers = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE}/coins/top_gainers_losers?vs_currency=${currency.name}&duration=24h`,
        { headers }
      );
      const data = await res.json();
      setTopGainersLosers(data);
    } catch (err) {
      console.error("fetchTopGainersLosers", err);
    }
  }, [currency]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/coins/categories`, { headers });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("fetchCategories", err);
    }
  }, []);

  useEffect(() => {
    fetchAllCoin();
    fetchTrending();
    fetchGlobal();
    fetchTopGainersLosers();
    fetchCategories();
  }, [fetchAllCoin, fetchTrending, fetchGlobal, fetchTopGainersLosers, fetchCategories]);

  const contextValue = {
    allCoin,
    trending,
    globalData,
    topGainersLosers,
    categories,
    currency,
    setCurrency,
    fetchAllCoin,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
