import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Navbar />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
