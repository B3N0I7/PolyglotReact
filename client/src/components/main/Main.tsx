import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddWord } from "../../pages/AddWord/AddWord";
import { UpdateWord } from "../../pages/UpdateWord/UpdateWord";
import { ShowWords } from "../../pages/ShowWords/ShowWords";
import { QuizFrenchEnglish } from "../../pages/QuizFrenchEnglish/QuizFrenchEnglish";
import { QuizEnglishFrench } from "../../pages/QuizEnglishFrench/QuizEnglishFrench";
import { Quit } from "../../pages/Quit/Quit";
import "./main.css";

export const Main = () => {
  return (
    <div className="central-bloc">
      <Routes>
        <Route path="/AddWord" element={<AddWord />} />
        <Route path="/UpdateWord" element={<UpdateWord />} />
        <Route path="/ShowWords" element={<ShowWords />} />
        <Route path="/QuizFrenchEnglish" element={<QuizFrenchEnglish />} />
        <Route path="/QuizEnglishFrench" element={<QuizEnglishFrench />} />
        <Route path="/Quit" element={<Quit />} />
      </Routes>
    </div>
  );
};
