import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Message } from "../messagesSuccessError/messagesSuccessError";
import "./quizTranslation.css";

type TranslationType = "toFrench" | "toEnglish";

interface QuizTranslationProps {
  translationType: TranslationType;
  apiUriRandomWord: string;
  apiUriVerifyWord: string;
  title: string;
  errorMessage: string;
  successMessage: string;
}

export const QuizTranslation = ({
  translationType,
  apiUriRandomWord,
  apiUriVerifyWord,
  title,
  errorMessage,
  successMessage,
}: QuizTranslationProps) => {
  const { pseudo } = useContext(UserContext)!;
  const [currentWord, setCurrentWord] = useState({
    id: null,
    english: "",
    french: "",
  });
  const [userInput, setUserInput] = useState({ english: "", french: "" });
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const generateWord = async () => {
    try {
      const response = await fetch(`${apiUriRandomWord}/${pseudo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(`${apiUriRandomWord}/${pseudo}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setCurrentWord({
        id: data.id,
        english: translationType === "toFrench" ? data.english : "",
        french: translationType === "toEnglish" ? data.french : "",
      });
      setUserInput({
        english: translationType === "toFrench" ? data.english : "",
        french: translationType === "toEnglish" ? data.french : "",
      });
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de la récupération du mot :", error);
    }
  };

  const verifyTranslation = async () => {
    try {
      const response = await fetch(`${apiUriVerifyWord}/${pseudo}`, {
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
        setMessage(successMessage);
      } else {
        setIsCorrect(false);
        const correctAnswer =
          translationType === "toFrench"
            ? data.correctFrench
            : data.correctEnglish;
        setMessage(`${errorMessage} ${correctAnswer}`);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la traduction :", error);
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>
              {translationType === "toFrench" ? "Mot anglais" : "Mot français"}
            </th>
            <th>
              {translationType === "toFrench" ? "Mot français" : "Mot anglais"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                value={
                  translationType === "toFrench"
                    ? userInput.english
                    : userInput.french
                }
                onChange={(e) =>
                  setUserInput({
                    ...userInput,
                    [translationType === "toFrench" ? "english" : "french"]:
                      e.target.value,
                  })
                }
              />
            </td>
            <td>
              <textarea
                value={
                  translationType === "toFrench"
                    ? userInput.french
                    : userInput.english
                }
                onChange={(e) =>
                  setUserInput({
                    ...userInput,
                    [translationType === "toFrench" ? "french" : "english"]:
                      e.target.value,
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quiz-buttons-generate-word">
        <button onClick={generateWord}>
          Générer un mot{" "}
          {translationType === "toFrench" ? "anglais" : "français"}
        </button>
      </div>
      <div className="quiz-buttons-test-answer">
        <button onClick={verifyTranslation}>
          Vérifier le mot{" "}
          {translationType === "toFrench" ? "français" : "anglais"}
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
