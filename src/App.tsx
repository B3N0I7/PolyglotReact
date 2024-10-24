import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main/*" element={<Body />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
