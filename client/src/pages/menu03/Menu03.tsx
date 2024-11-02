import React, { useState, useEffect } from "react";
import { Word } from "../../models/word.ts";
import { API_URI, TITLE, PAGE_SIZE } from "./constants.ts";
import "./menu03.css";

export const Menu03 = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_URI);
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Error fetching words", error);
      }
    };

    fetchWords();
  }, []);

  const totalPages = Math.ceil(words.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentWords = words.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          {currentWords.map((word) => (
            <tr key={word.id}>
              <td>{word.english}</td>
              <td>{word.french}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};
