import Coin from "../../assets/coin.webp";
import Card from "../../components/Card/Card";
const Pricing = () => {
  return (
    <>

    <div className="flex flex-col md:flex-row justify-around m-5 md:m-20 mt-[25px] items-center mb-[150px] gap-8">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-center md:text-left font-semibold text-[50px] md:text-[58px] tracking-[0.7px] pt-2.5 leading-tight">
          Grow Your Crypto With <br /> <b className="text-gold">CoinApp Premium</b>
        </h1>
        <p className="mt-5 text-[18px] text-justify md:text-start leading-relaxed text-[#e3e3e3]">
          CoinApp provides you a complete toolset for effortlessly managing all
          your crypto, <br className="hidden md:inline"/>NFTs.and DeFi assets from one place. You will always
          make precise data-based investment <br className="hidden md:inline"/>decisions and act at the right
          time.
        </p>
        <button className="mt-5 text-[15px] mr-[2px] border-2 border-white bg-gold text-black py-2.5 px-[30px] rounded-[25px] cursor-pointer hover:bg-transparent hover:text-white transition duration-300 font-medium">Start Free Trial</button>
      </div>
      <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px]">
        <img src={Coin} alt="" className="w-full h-full object-contain" />
      </div>
    </div>
    <Card/>
    </>
  );
};

export default Pricing;
