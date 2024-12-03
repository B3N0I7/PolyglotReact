import React, { useState, useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import {
  API_URI_RANDOM_WORD,
  API_URI_VERIFY_WORD,
  TITLE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "./constants";
import { Message } from "./../../shared/messagesSuccessError";
import "./quizFrenchEnglish.css";

type TranslationType = "english" | "french";

export const QuizFrenchEnglish = () => {
  const { pseudo } = useContext(UserContext)!;
  console.log(`Quiz French to English : ${pseudo}`);
  const [currentWord, setCurrentWord] = useState({
    id: null,
    english: "",
    french: "",
  });
  const [userInput, setUserInput] = useState({ english: "", french: "" });
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const generateFrenchWord = async () => {
    try {
      const response = await fetch(`${API_URI_RANDOM_WORD}/${pseudo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(
        `Generate French Word (FE) : ${API_URI_RANDOM_WORD}/${pseudo}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setCurrentWord({
        id: data.id,
        english: "",
        french: data.french,
      });
      setUserInput({ english: "", french: data.french });
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de la récupération du mot français :", error);
    }
  };

  const verifyTranslation = async (type: TranslationType) => {
    try {
      const response = await fetch(`${API_URI_VERIFY_WORD}/${pseudo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wordId: currentWord.id,
          english: userInput.english,
          french: userInput.french,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();

      if (data.isCorrect) {
        setIsCorrect(true);
        setMessage(SUCCESS_MESSAGE);
        console.log("Yes!");
      } else {
        if (type === "english") {
          setIsCorrect(false);
          setMessage(`${ERROR_MESSAGE} ${data.correctEnglish}`);
        } else if (type === "french") {
          setIsCorrect(false);
          setMessage(`${ERROR_MESSAGE} ${data.correctFrench}`);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la traduction :", error);
    }
  };

  return (
    <div>
      <h3>{TITLE}</h3>
      <table>
        <thead>
          <tr>
            <th>Mot français</th>
            <th>Mot anglais</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                value={userInput.french}
                onChange={(e) =>
                  setUserInput({ ...userInput, french: e.target.value })
                }
              />
            </td>
            <td>
              <textarea
                value={userInput.english}
                onChange={(e) =>
                  setUserInput({ ...userInput, english: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quiz-buttons-generate-word">
        <button onClick={generateFrenchWord}>Générer un mot français</button>
      </div>
      <div className="quiz-buttons-test-answer">
        <button onClick={() => verifyTranslation("english")}>
          Vérifier le mot anglais
        </button>
      </div>
      <Message
        message={message}
        setMessage={setMessage}
        type={isCorrect ? "goodAnswer" : "badAnswer"}
      />
    </div>
  );
};
