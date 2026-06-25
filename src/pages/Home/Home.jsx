import SearchCoins from "../../components/searchCoins/SearchCoins";
import HomeImg from "../../assets/home1.webp"
const Home = () => {
 
  return (
    <div className="p-2.5 pb-[100px]">
      <div className="m-[50px] mb-0 md:mb-[280px] flex flex-col md:flex-row justify-around items-center text-center gap-[30px]">
        <div>
        <h1 
          className="flex ml-0 md:ml-[70px] text-[50px] md:text-[max(4vw,66px)] animate-shine"
          style={{ 
            background: "linear-gradient(to right, gold, gold, hsl(0, 0%, 30%) 20%)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent" 
          }}
        >
        Today's Crypto <br/>
         Prices by Market Cap
        </h1>
        <p className="hidden md:block !text-justify ml-[70px] mt-[30px] w-[75%] text-[#e3e3e3] leading-[1.5] text-[1.2rem]">
        Our platform offers expert insights, market trends, and practical guides to help you navigate the crypto landscape. Whether you’re a seasoned investor or a curious newcomer, discover the power of crypto with us.
        </p>
        </div>
        <div className="home-img">
          <img src={HomeImg} alt="" className="w-[350px] md:w-[400px]" style={{ filter: "drop-shadow(5px 5px 90px #fff)" }} />
        </div>
      </div>
      <SearchCoins/>
    </div>
  );
};

export default Home;
