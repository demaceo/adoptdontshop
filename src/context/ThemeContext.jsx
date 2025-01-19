import React, { createContext, useState } from "react";

// export const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// });

export const ThemeContext = createContext();

// interface ThemeProviderProps {
//   children: React.ReactNode;
// }

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
