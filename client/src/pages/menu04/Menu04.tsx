// import React from "react";
// import { TITLE } from "./constants";

// export const Menu04 = () => {
//   return (
//     <div>
//       <h3>{TITLE}</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Mot anglais</th>
//             <th>Mot français</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <textarea></textarea>
//             </td>
//             <td>
//               <textarea></textarea>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <textarea></textarea>
//             </td>
//             <td>
//               <textarea></textarea>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="quiz-buttons-generate-word">
//         <button>Générer un mot anglais</button>
//         <button>Générer un mot français</button>
//       </div>
//       <div className="quiz-buttons-test-answer">
//         <button>Vérifier le mot français</button>
//         <button>Vérifier le mot anglais</button>
//       </div>
//     </div>
//   );
// };

// Quiz axios
// import React, { useState } from "react";
// import { TITLE } from "./constants";
// import axios from "axios";

// export const Menu04 = () => {
//   const [currentWord, setCurrentWord] = useState({
//     id: null,
//     english: "",
//     french: "",
//   });
//   const [userInput, setUserInput] = useState({ english: "", french: "" });
//   const [feedback, setFeedback] = useState("");

//   const generateEnglishWord = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/words/random/english"
//       );
//       setCurrentWord({
//         id: response.data.id,
//         english: response.data.english,
//         french: "",
//       });
//       setUserInput({ english: response.data.english, french: "" });
//       setFeedback("");
//     } catch (error) {
//       console.error("Error fetching word:", error);
//     }
//   };

//   const generateFrenchWord = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/words/random/french"
//       );
//       setCurrentWord({
//         id: response.data.id,
//         english: "",
//         french: response.data.french,
//       });
//       setUserInput({ english: "", french: response.data.french });
//       setFeedback("");
//     } catch (error) {
//       console.error("Error fetching word:", error);
//     }
//   };

//   const verifyTranslation = async (type) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/words/verify",
//         {
//           wordId: currentWord.id,
//           english: userInput.english,
//           french: userInput.french,
//         }
//       );

//       if (response.data.isCorrect) {
//         setFeedback("Correct !");
//       } else {
//         setFeedback(
//           `Incorrect. La bonne réponse est : ${response.data.correctEnglish} - ${response.data.correctFrench}`
//         );
//       }
//     } catch (error) {
//       console.error("Error verifying translation:", error);
//     }
//   };

//   return (
//     <div>
//       <h3>{TITLE}</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Mot anglais</th>
//             <th>Mot français</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <textarea
//                 value={userInput.english}
//                 onChange={(e) =>
//                   setUserInput({ ...userInput, english: e.target.value })
//                 }
//               />
//             </td>
//             <td>
//               <textarea
//                 value={userInput.french}
//                 onChange={(e) =>
//                   setUserInput({ ...userInput, french: e.target.value })
//                 }
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="quiz-buttons-generate-word">
//         <button onClick={generateEnglishWord}>Générer un mot anglais</button>
//         <button onClick={generateFrenchWord}>Générer un mot français</button>
//       </div>
//       <div className="quiz-buttons-test-answer">
//         <button onClick={() => verifyTranslation("french")}>
//           Vérifier le mot français
//         </button>
//         <button onClick={() => verifyTranslation("english")}>
//           Vérifier le mot anglais
//         </button>
//       </div>
//       {feedback && <div className="feedback">{feedback}</div>}
//     </div>
//   );
// };

// Quiz fetch
import React, { useState, useEffect } from "react";
import { TITLE } from "./constants";

type TranslationType = "english" | "french";

export const Menu04 = () => {
  const [currentWord, setCurrentWord] = useState({
    id: null,
    english: "",
    french: "",
  });
  const [userInput, setUserInput] = useState({ english: "", french: "" });
  const [feedback, setFeedback] = useState("");

  const generateEnglishWord = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/words/random/english"
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setCurrentWord({
        id: data.id,
        english: data.english,
        french: "",
      });
      setUserInput({ english: data.english, french: "" });
      setFeedback("");
    } catch (error) {
      console.error("Erreur lors de la récupération du mot anglais :", error);
    }
  };

  const generateFrenchWord = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/words/random/french"
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
      setFeedback("");
    } catch (error) {
      console.error("Erreur lors de la récupération du mot français :", error);
    }
  };

  const verifyTranslation = async (type: TranslationType) => {
    // const verifyTranslation = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/words/verify", {
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
        setFeedback("Correct !");
        console.log("Yes!");
      } else {
        // setFeedback(
        //   `Incorrect. La bonne réponse est : ${data.correctEnglish} - ${data.correctFrench}`
        // );
        if (type === "english") {
          setFeedback(
            `Incorrect. La bonne réponse en anglais est : ${data.correctEnglish}`
          );
        } else if (type === "french") {
          setFeedback(
            `Incorrect. La bonne réponse en français est : ${data.correctFrench}`
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la traduction :", error);
    }
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div>
      <h3>{TITLE}</h3>
      <table>
        <thead>
          <tr>
            <th>Mot anglais</th>
            <th>Mot français</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                value={userInput.english}
                onChange={(e) =>
                  setUserInput({ ...userInput, english: e.target.value })
                }
              />
            </td>
            <td>
              <textarea
                value={userInput.french}
                onChange={(e) =>
                  setUserInput({ ...userInput, french: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quiz-buttons-generate-word">
        <button onClick={generateEnglishWord}>Générer un mot anglais</button>
        <button onClick={generateFrenchWord}>Générer un mot français</button>
      </div>
      <div className="quiz-buttons-test-answer">
        <button onClick={() => verifyTranslation("french")}>
          {/* <button onClick={() => verifyTranslation()}> */}
          Vérifier le mot français
        </button>
        <button onClick={() => verifyTranslation("english")}>
          {/* <button onClick={() => verifyTranslation()}> */}
          Vérifier le mot anglais
        </button>
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};
