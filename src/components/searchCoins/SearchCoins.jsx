import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";

const SearchCoins = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, SetDisplayCoin] = useState([]);
  const [input, SetInput] = useState("");
  const inputHandler = (event) => {
    SetInput(event.target.value);
    if (event.target.value === "") {
      SetDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    SetDisplayCoin(coins);
  };

  useEffect(() => {
    SetDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <div>
    
      <form onSubmit={searchHandler} className="max-h-[600px] my-20 mx-auto p-2 w-[80%] min-[500px]:w-[60%] md:w-[40%] border-[1.5px] border-[#d7cfc1] rounded-xl text-[20px] flex justify-between items-center gap-2.5 bg-transparent">
        <input
          onChange={inputHandler}
          list="coinList"
          value={input}
          type="text"
          placeholder="Search crypto..."
          required
          className="bg-transparent flex-1 text-[16px] outline-none border-none pl-2.5 text-white max-[500px]:w-[100px]"
        />
        <datalist id="coinList">
          {allCoin.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
        <button type="submit" className="text-[14px] mr-[2px] border-none bg-gold text-black py-2.5 px-[30px] rounded-xl cursor-pointer hover:text-red-600 transition-colors duration-200 font-semibold">Search</button>
      </form>

      <div 
        className="max-w-[800px] mx-auto rounded-2xl p-1.5"
        style={{ 
          filter: "drop-shadow(5px 5px 150px rgba(255,255,255,0.1))", 
          background: "linear-gradient(rgba(195, 191, 186, 0), rgba(240, 209, 10, 0.173))" 
        }}
      >
        <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-[15px] px-5 items-center border-b border-[#f1e2e2] last:border-none text-[13px] min-[500px]:text-base font-semibold">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="text-right hidden md:block">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coins/${item.id}`} className="grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-[15px] px-5 items-center border-b border-[#f1e2e2] last:border-none text-[13px] min-[500px]:text-base hover:bg-white/5 transition-colors duration-150" key={index}>
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-2.5">
              <img src={item.image} alt="" className="w-[25px] min-[500px]:w-[35px]" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.Symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "text-[#00d515] text-center" : "text-[#ff4646] text-center"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className="text-right hidden md:block">
              {" "}
              {currency.Symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchCoins;
