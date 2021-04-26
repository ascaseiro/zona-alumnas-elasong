import { createContext } from "react";

export const AlumnaContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});