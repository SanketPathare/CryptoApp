import { Routes ,Route} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Coins from "./pages/Coins/Coins"
import Footer from "./components/Footer/Footer"



const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/coins/:coinID" element={<Coins/>} />
      </Routes>
       <Footer/>
    </div>
  )
 }

export default App