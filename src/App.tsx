import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import SearchBar from "./Components/Search/SearchBar.tsx";
import Results from "./Components/Results/Results.tsx";
import Favorites from "./Components/Favorites/Favorites.tsx";
import Footer from "./Components/Footer/Footer.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <NavBar />
              <SearchBar />
              <Footer />
            </>
          }
        />
        <Route
          path="/results"
          element={
            <>
              <NavBar />
              <SearchBar />
              <Results />
              <Footer />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <NavBar />
              <SearchBar />
              <Favorites />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
