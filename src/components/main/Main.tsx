import { Routes, Route } from "react-router-dom";
import { Menu01 } from "./../../pages/menu01/Menu01";
import { Menu02 } from "./../../pages/menu02/Menu02";
import { Menu03 } from "./../../pages/menu03/Menu03";
import { Menu04 } from "./../../pages/menu04/Menu04";
import { Menu05 } from "./../../pages/menu05/Menu05";
import "./main.css";

export const Main = () => {
  return (
    <div className="central-bloc">
      <Routes>
        <Route path="/menu01" element={<Menu01 />} />
        <Route path="/menu02" element={<Menu02 />} />
        <Route path="/menu03" element={<Menu03 />} />
        <Route path="/menu04" element={<Menu04 />} />
        <Route path="/menu05" element={<Menu05 />} />
      </Routes>
    </div>
  );
};
