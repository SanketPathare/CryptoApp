import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, SetCoinData] = useState();
  const [historicalData, SetHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-6MSxZs6y5R5mPUNufniP6FDg	",
      },
    };


    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => SetCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => SetHistoricalData(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if ((coinData, historicalData)) {
    return (
      <div className="px-5">
        <div className="flex flex-col items-center gap-5 my-[100px] mx-auto mb-[50px]">
          <img src={coinData.image.large} alt="" className="max-w-[100px]" />
          <p>
            <b className="text-[44px] font-medium">
              {coinData.name}({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="max-w-[600px] h-[250px] mx-auto">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="max-w-[600px] my-[50px] mx-auto flex flex-col">
          <ul className="flex justify-between py-2.5 border-b border-[#5f5d5f] list-none">
            <li>Crypto Market Rank</li>
            <li className="font-light">{coinData.market_cap_rank}</li>
          </ul>
          <ul className="flex justify-between py-2.5 border-b border-[#5f5d5f] list-none">
            <li>Current Price</li>
            <li className="font-light">
              {currency.Symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between py-2.5 border-b border-[#5f5d5f] list-none">
            <li>Market Cap</li>
            <li className="font-light">
              {currency.Symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between py-2.5 border-b border-[#5f5d5f] list-none">
            <li>24 Hour High</li>
            <li className="font-light">
              {currency.Symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between py-2.5 border-b border-[#5f5d5f] list-none">
            <li>24 Hour Low</li>
            <li className="font-light">
              {currency.Symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-[65px] h-[65px] rounded-full border-[5px] border-[#bdbdbd] border-t-[#4500c6] animate-spin"></div>
      </div>
    );
  }
};

export default Coins;
