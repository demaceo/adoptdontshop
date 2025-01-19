import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      {/* {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} */}
      Switch to {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
