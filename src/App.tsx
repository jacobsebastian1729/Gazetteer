import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Favorite from "./pages/favorite/Favorite";
import CountryDetails from "./pages/countryDetails/CountryDetails";
import Footer from "./components/footer/Footer"
import StartPage from "./components/startpage/StartPage";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="" element={<StartPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/countrydetails" element={<CountryDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
