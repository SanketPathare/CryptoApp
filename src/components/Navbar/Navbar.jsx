// import logo from "../../assets/logo.png";
import Arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
const Navbar = () => {
  const { SetCurrency } = useContext(CoinContext);
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        SetCurrency({ name: "usd", Symbol: "$" });
        break;
      }
      case "inr": {
        SetCurrency({ name: "inr", Symbol: "₹" });
        break;
      }
      case "eur": {
        SetCurrency({ name: "eur", Symbol: "€" });
        break;
      }
      default: {
        SetCurrency({ name: "usd", Symbol: "$" });
        break;
      }


    }
  };
  return (
    <div className="flex items-center justify-between py-5 px-[5%] md:px-[8%] lg:px-[10%] text-[#ddd] border-b-2 border-[#cecbc896]">
      <Link to={"/"}>
        <h2 className="text-2xl font-bold text-white tracking-wider hover:text-gold transition-colors duration-300">Crypto.</h2>
      </Link>
      {/* <img src={logo} alt="img" className="logo" /> */}
      <ul className="hidden md:flex gap-10 list-none">
        <Link to={"/"}>
          <li className="text-[1.2rem] cursor-pointer hover:text-gold hover:border-b-2 hover:border-gold transition-all duration-200">Home</li>
        </Link>
        <Link to={"/pricing"}>
          <li className="text-[1.2rem] cursor-pointer hover:text-gold hover:border-b-2 hover:border-gold transition-all duration-200">Pricing</li>
        </Link>

        <Link to={"/contact"}>
          <li className="text-[1.2rem] cursor-pointer hover:text-gold hover:border-b-2 hover:border-gold transition-all duration-200">Contact</li>
        </Link>
      </ul>
      <div className="flex items-center gap-[max(1vw,14px)]">
        <select onChange={currencyHandler} className="py-2.5 px-2 rounded-xl border-2 border-white text-white bg-transparent mr-[30px] focus:outline-none cursor-pointer">
          <option value="usd" className="bg-[#bdbdc1] text-white">USD</option>
          <option value="inr" className="bg-[#bdbdc1] text-white">INR</option>
          <option value="eur" className="bg-[#bdbdc1] text-white">EUR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
