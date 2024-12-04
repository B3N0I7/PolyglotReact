import React from "react";
import { QuizTranslation } from "../../shared/quizTranslation/quizTranslation";
import {
  TRANSLATION_TYPE,
  API_URI_RANDOM_WORD,
  API_URI_VERIFY_WORD,
  TITLE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "./constants";
import "./quizFrenchEnglish.css";

export const QuizFrenchEnglish = () => (
  <QuizTranslation
    translationType={TRANSLATION_TYPE}
    apiUriRandomWord={API_URI_RANDOM_WORD}
    apiUriVerifyWord={API_URI_VERIFY_WORD}
    title={TITLE}
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
  />
);
