import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate(`/main?name=${name}`);
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Présente toi l'ami :</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};
