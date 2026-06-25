import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Coins from "./pages/Coins/Coins";
import Footer from "./components/Footer/Footer";
import Pricing from "./pages/Pricing/Pricing";
import Contact from "./pages/Contact/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coins/:coinId" element={<Coins />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
