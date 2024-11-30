import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Word } from "../../models/word.ts";
import { TITLE, API_URI_ENGLISH, API_URI_FRENCH, API_URI } from "./constants";

export const UpdateWord: React.FC = () => {
  const { pseudo } = useContext(UserContext)!;
  const [searchWord, setSearchWord] = useState<string>("");
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [wordData, setWordData] = useState<Word | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const url = isEnglish
      ? `${API_URI_ENGLISH}/${pseudo}/${searchWord}`
      : `${API_URI_FRENCH}/${pseudo}/${searchWord}`;
    console.log(url);
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data: Word = await response.json();
      console.log(data._id);
      console.log(data.english);
      console.log(data.french);
      console.log(data.category);
      console.log(data.difficulty);
      setWordData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordData) {
      console.log(
        `wordData: ${wordData._id}-${wordData.english}-${wordData.french}-${wordData.category}-${wordData.difficulty}`
      );
      console.log(`wordData.id: ${wordData._id}`);
      try {
        const response = await fetch(`/${API_URI}/${pseudo}/${wordData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wordData),
        });

        if (!response.ok) {
          throw new Error("Error updating word");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h3>{TITLE}</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Mot à recherché"
          required
        />
        <div>
          <label>
            <input
              type="radio"
              value="english"
              checked={isEnglish}
              onChange={() => setIsEnglish(true)}
            />{" "}
            Anglais
          </label>
          <label>
            <input
              type="radio"
              value="french"
              checked={!isEnglish}
              onChange={() => setIsEnglish(false)}
            />{" "}
            Français
          </label>
        </div>
        <button type="submit">Rechercher</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {wordData && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Mot anglais</label>
            <input
              type="text"
              value={wordData.english}
              onChange={(e) =>
                setWordData({ ...wordData, english: e.target.value })
              }
            />
            <label>Mot français</label>
            <input
              type="text"
              value={wordData.french}
              onChange={(e) =>
                setWordData({ ...wordData, french: e.target.value })
              }
            />
          </div>
          <div>
            <label>Catégorie</label>
            <input
              type="text"
              value={wordData.category || ""}
              onChange={(e) =>
                setWordData({ ...wordData, category: e.target.value })
              }
            />
            <label>Difficulté</label>
            <input
              type="text"
              value={wordData.difficulty || ""}
              onChange={(e) =>
                setWordData({ ...wordData, difficulty: e.target.value })
              }
            />
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      )}
    </div>
  );
};
