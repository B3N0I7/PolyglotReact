import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Body />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
