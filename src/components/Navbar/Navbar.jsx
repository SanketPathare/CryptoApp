import "./Navbar.css";
// import logo from "../../assets/logo.png";
import Arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
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
       default :{
        SetCurrency({ name: "usd", Symbol: "$" });
        break;
       }
    }
  };
  return (
    <div className="navbar">
      <h2>Crypto.</h2>
      {/* <img src={logo} alt="img" className="logo" /> */}
      <ul>
        <li>Home</li>
        <li>Pricing</li>
        <li>Blog</li>
        <li>About</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={Arrow} alt="img" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
