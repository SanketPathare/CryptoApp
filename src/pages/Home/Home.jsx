import SearchCoins from "../../components/searchCoins/SearchCoins";
import "./Home.css";
import HomeImg from "../../assets/home1.webp"
const Home = () => {
 
  return (
    <div className="Home">
      <div className="Hero">
        <div>
        <h1>
        Today's Crypto <br/>
         Prices by Market Cap
        </h1>
        <p>
        Our platform offers expert insights, market trends, and practical guides to help you navigate the crypto landscape. Whether you’re a seasoned investor or a curious newcomer, discover the power of crypto with us.
        </p>
        </div>
        <div className="home-img">
          <img src={HomeImg} alt="" />
        </div>
      </div>
      <SearchCoins/>
    </div>
  );
};

export default Home;
