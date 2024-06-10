import "./Pricing.css";
import Coin from "../../assets/coin.webp";
import Card from "../../components/Card/Card";
const Pricing = () => {
  return (
    <>

    <div className="price">
      <div className="price-title">
        <h1>
          Grow Your Crypto With <br /> <b>CoinApp Premium</b>
        </h1>
        <p>
          CoinApp provides you a complete toolset for effortlessly managing all
          your crypto, <br/>NFTs.and DeFi assets from one place. You will always
          make precise data-based investment <br/>decisions and act at the right
          time.
        </p>
        <button className="btn">Start Free Trial</button>
      </div>
      <div className="price-img">
        <img src={Coin} alt="" />
      </div>
    </div>
    <Card/>
    </>
  );
};

export default Pricing;
