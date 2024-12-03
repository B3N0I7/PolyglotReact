import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Word } from "../../models/word.ts";
import { Message } from "./../../shared/messagesSuccessError.tsx";
import {
  TITLE,
  API_URI_ENGLISH,
  API_URI_FRENCH,
  API_URI_UPDATE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "./constants";

export const UpdateWord = () => {
  const { pseudo } = useContext(UserContext)!;
  const [searchWord, setSearchWord] = useState<string>("");
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [wordData, setWordData] = useState<Word | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
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
      setIsCorrect(false);
      setMessage(err.message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordData) {
      console.log(
        `wordData: ${wordData._id}-${wordData.english}-${wordData.french}-${wordData.category}-${wordData.difficulty}`
      );
      console.log(`wordData.id: ${wordData._id}`);
      console.log(`wordData : ${wordData}`);
      try {
        const response = await fetch(
          `${API_URI_UPDATE}/${pseudo}/${wordData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              english: wordData.english,
              french: wordData.french,
              category: wordData.category,
              difficulty: wordData.difficulty,
            }),
          }
        );

        if (response.ok) {
          setIsCorrect(true);
          setMessage(SUCCESS_MESSAGE);
        }

        if (!response.ok) {
          setIsCorrect(false);
          setMessage(ERROR_MESSAGE);
          //throw new Error("Error updating word");
        }
      } catch (err) {
        setMessage(err.message);
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
      <Message
        message={message}
        setMessage={setMessage}
        type={isCorrect ? "goodAnswer" : "badAnswer"}
      />
    </div>
  );
};
