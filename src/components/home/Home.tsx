import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./home.css";

export const Home = () => {
  const { setPseudo } = useContext(UserContext)!;
  const navigate = useNavigate();
  const [pseudoInput, setPseudoInput] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPseudo(pseudoInput);
    navigate("/main");
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pseudo">Quel est ton pseudo ?</label>
        <br />
        <input
          type="text"
          id="pseudo"
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
