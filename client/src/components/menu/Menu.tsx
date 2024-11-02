import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
  return (
    <div className="navigation-menu">
      <h3>Que voulez-vous faire ?</h3>
      <br />
      <p>
        <Link to="/main/menu01">Ajouter des mots</Link>
      </p>
      <p>
        <Link to="/main/menu02">Modifier des mots</Link>
      </p>
      <p>
        <Link to="/main/menu03">Consulter la liste des mots</Link>
      </p>
      <p>
        <Link to="/main/menu04">Faire un quiz</Link>
      </p>
      <p>
        <Link to="/main/menu05">Quitter</Link>
      </p>
    </div>
  );
};
