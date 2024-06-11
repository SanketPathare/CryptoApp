import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Coins from "./pages/Coins/Coins";
import Footer from "./components/Footer/Footer";
import Pricing from "./pages/Pricing/Pricing";
import Contact from "./pages/Contact/Contact";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing/>}/>
         <Route path="/contact" element={<Contact/>}/>       
        <Route path="/coins/:coinId" element={<Coins />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
