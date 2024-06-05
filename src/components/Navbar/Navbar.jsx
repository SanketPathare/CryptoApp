import "./Navbar.css";
import logo from "../../assets/logo.png";
import Arrow from "../../assets/arrow_icon.png"
const Navbar = () => {
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
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign up <img src={Arrow} alt="img"/></button>
      </div>
    </div>
  );
};

export default Navbar;
