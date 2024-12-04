import React from "react";
import { useEffect } from "react";
import "./messagesSuccessError.css";

export const Message = ({ message, setMessage, type }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return <span className={type}>{message}</span>;
};
