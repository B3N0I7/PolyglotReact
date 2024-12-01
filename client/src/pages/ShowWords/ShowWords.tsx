import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { Word } from "../../models/word.ts";
import { API_URI, TITLE, PAGE_SIZE } from "./constants.ts";
import "./showWords.css";

export const ShowWords = () => {
  const { pseudo } = useContext(UserContext)!;
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          `${API_URI}/${pseudo}/${categoryFilter || "all"}/${
            difficultyFilter || "all"
          }`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Error fetching words", error);
      }
    };

    fetchWords();
  }, [pseudo, categoryFilter, difficultyFilter]);

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
      <select
        className="filteredList"
        // onChange={(e) => setCategoryFilter(e.target.value)}
        onChange={(e) => {
          setCategoryFilter(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">Toutes les catégories</option>
        <option value="numbers">numbers</option>
        <option value="two-deux">two-deux-test</option>
        <option value="family">family</option>
      </select>
      <select
        className="filteredList"
        // onChange={(f) => setDifficultyFilter(f.target.value)}
        onChange={(f) => {
          setDifficultyFilter(f.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">Toutes les difficultés</option>
        <option value="easy">facile</option>
        <option value="medium">moyen</option>
        <option value="hard">difficile</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Mot anglais</th>
            <th>Mot français</th>
          </tr>
        </thead>
        <tbody>
          {currentWords.map((word, index) => (
            <tr key={`${word._id}-${index}`}>
              <td>{word.english}</td>
              <td>{word.french}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber, index) => (
            <button
              key={`${pageNumber}-${index}`}
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
