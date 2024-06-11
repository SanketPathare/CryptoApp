import "./Navbar.css";
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
      default: {
        SetCurrency({ name: "usd", Symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <h2>Crypto.</h2>
      </Link>
      {/* <img src={logo} alt="img" className="logo" /> */}
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/pricing"}>
          <li>Pricing</li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        <Link to={"/contact"}>
        <li>
          Contact
        </li>
        </Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
