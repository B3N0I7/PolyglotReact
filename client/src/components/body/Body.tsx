import React from "react";
import { Menu } from "./../menu";
import { Main } from "./../main";
import "./body.css";

export const Body = () => {
  return (
    <>
      <div className="body-container">
        <Menu />
        <Main />
      </div>
    </>
  );
};
