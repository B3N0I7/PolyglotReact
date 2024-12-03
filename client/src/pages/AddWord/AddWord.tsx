import React, { useEffect, useState, useContext } from "react";
import { API_URI, TITLE, ERROR_MESSAGE, SUCCESS_MESSAGE } from "./constants";
import { UserContext } from "./../../context/UserContext";
import { Message } from "./../../shared/messagesSuccessError";
import "./addWord.css";

export const AddWord = () => {
  const { pseudo } = useContext(UserContext)!;
  const [englishWord, setEnglishWord] = useState("");
  const [frenchWord, setFrenchWord] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URI}/${pseudo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          english: englishWord,
          french: frenchWord,
          category: category,
          difficulty: difficulty,
          creationDate: Date.now,
        }),
      });
      if (response.ok) {
        console.log("Word added successfully!");
        setIsCorrect(true);
        setMessage(SUCCESS_MESSAGE);
        setEnglishWord("");
        setFrenchWord("");
        setCategory("");
        setDifficulty("");
      } else {
        console.error("Word not added.");
        setIsCorrect(false);
        setMessage(ERROR_MESSAGE);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsCorrect(false);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleQuit = () => {
    setEnglishWord("");
    setFrenchWord("");
    setCategory("");
    setDifficulty("");
    console.log("Formulaire réinitialisé.");
  };

  return (
    <div>
      <h3>{TITLE}</h3>
      <form onSubmit={handleSubmit}>
        <label>Entrer le mot en anglais</label>
        <input
          type="text"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
          required
        />
        <br />
        <label>Entrer le mot en français</label>
        <input
          type="text"
          value={frenchWord}
          onChange={(e) => setFrenchWord(e.target.value)}
          required
        />
        <br />
        <label>Entrer la catégorie</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label>Entrer le niveau de difficulté</label>
        <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <br />
        <button type="submit">Valider</button>
        <button type="button" onClick={handleQuit}>
          Effacer
        </button>
        <br />
        <Message
          message={message}
          setMessage={setMessage}
          type={isCorrect ? "goodAnswer" : "badAnswer"}
        />
      </form>
    </div>
  );
};
