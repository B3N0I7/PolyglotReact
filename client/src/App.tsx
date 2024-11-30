import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

import "./App.css";

function App() {
  const [pseudo, setPseudo] = useState("");

  return (
    <UserContext.Provider value={{ pseudo, setPseudo }}>
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
    </UserContext.Provider>
  );
}

export default App;
