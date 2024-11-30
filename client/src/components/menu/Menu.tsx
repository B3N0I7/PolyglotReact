import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
  return (
    <div className="navigation-menu">
      <h3>Que voulez-vous faire ?</h3>
      <br />
      <p>
        <Link to="/main/AddWord">Ajouter des mots</Link>
      </p>
      <p>
        <Link to="/main/UpdateWord">Modifier des mots</Link>
      </p>
      <p>
        <Link to="/main/ShowWords">Consulter la liste des mots</Link>
      </p>
      <p>
        <Link to="/main/QuizFrenchEnglish">
          Faire un quiz Français - Anglais
        </Link>
      </p>
      <p>
        <Link to="/main/QuizEnglishFrench">
          Faire un quiz Anglais - Français
        </Link>
      </p>
      <p>
        <Link to="/main/Quit">Quitter</Link>
      </p>
    </div>
  );
};
