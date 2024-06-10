import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";
import "./SearchCoins.css";
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
    
      <form onSubmit={searchHandler}>
        <input
          onChange={inputHandler}
          list="coinList"
          value={input}
          type="text"
          placeholder="Search crypto..."
          required
        />
        <datalist id="coinList">
          {allCoin.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
        <button type="submit">Search</button>
      </form>

      <div className="table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coins/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.Symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
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
