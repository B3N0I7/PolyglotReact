import { createContext } from "react";

interface UserContextType {
  pseudo: string;
  setPseudo: (pseudo: string) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
