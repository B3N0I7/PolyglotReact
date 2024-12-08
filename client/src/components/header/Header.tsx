import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./header.css";

export const Header = () => {
  const { pseudo } = useContext(UserContext)!;
  return (
    <div className="header">
      <img src="logo-transparent.png" alt="Logo du site" />
      <h1>Welcome to Polyglot</h1>
      {pseudo && <p>Bonjour {pseudo}</p>}
    </div>
  );
};
