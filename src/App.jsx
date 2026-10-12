import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Coins from "./pages/Coins/Coins";
import Watchlist from "./pages/Watchlist/Watchlist";
import Categories from "./pages/Categories/Categories";
import Converter from "./pages/Converter/Converter";
import Portfolio from "./pages/Portfolio/Portfolio";
import Compare from "./pages/Compare/Compare";
import Footer from "./components/Footer/Footer";
import Pricing from "./pages/Pricing/Pricing";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ToastNotification from "./components/ToastNotification";

const App = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coins/:coinId" element={<Coins />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
      <ScrollToTop />
      <ToastNotification />
    </div>
  );
};

export default App;
