import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API_URI } from "./constants";
import "./home.css";

export const Home = () => {
  const { setPseudo } = useContext(UserContext)!;
  const navigate = useNavigate();
  const [pseudoInput, setPseudoInput] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPseudo(pseudoInput);

    try {
      const response = await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo: pseudoInput }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error: ", error);
    }

    navigate("/main");
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <label>Quel est ton pseudo ?</label>
        <br />
        <input
          className="input-container"
          type="text"
          value={pseudoInput}
          onChange={(e) => setPseudoInput(e.target.value)}
          required
        />
        <br />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};
