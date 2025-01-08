/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
import { BrowserRouter, useRoutes } from "react-router-dom";
// import { fetchAllAnimals } from "./utils/apiRequests";
// import { useLocalStorage } from "./utils/useLocalStorage";
// import { ResultsProps, GetAllAnimalsApiResponse } from "./utils/Types";

import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import SearchBar from "./Components/Search/SearchBar.tsx";
import Results from "./Components/Results/Results.tsx";
// import Favorites from "./Components/Favorites/Favorites.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";

function App() {
  const [finalResults, setFinalResults] = useState<any[]>([]);
  // const [favoritePets, setFavoritePets] = useState([]);
  // const [localStorage, setLocalStorage] = useLocalStorage("favorites");

  // useEffect(() => {
  //   let storedFavs: any = localStorage;
  //   storedFavs = storedFavs ? storedFavs : [];
  //   setFavoritePets(storedFavs);
  // }, [localStorage]);

  // const getAnimals = async () => {
  //   // const allResults: any = await fetchAllAnimals();
  //   let allResults: any[] = [];
  //   while (allResults.length < 30) {
  //     const initialResults: any = await fetchAllAnimals();
  //     allResults = [...allResults, ...initialResults.animals];
  //   }
  //   setFinalResults(allResults);
  //   console.log("final results", finalResults);
  // };

  //   useEffect(() => {
  //   if (finalResults.length === 0) {
  //     getAnimals();
  //   }
  // }, [finalResults.length, getAnimals]);

  // useEffect(() => {
  //   const getAnimals = async () => {
  //     let allResults: any[] = [];
  //     while (allResults.length < 30) {
  //       const initialResults: any = await fetchAllAnimals();
  //       allResults = [...allResults, ...initialResults.animals];
  //     }
  //     setFinalResults([...allResults]);
  //   };

  //   if (finalResults.length === 0) {
  //     getAnimals();
  //   }
  // }, [finalResults]);

  // useEffect(() => {
  //   console.log("Updated final results:", finalResults);
  // }, [finalResults]);

  const checkResults = () => {
    if (!finalResults) {
      return (
        <h2>
          Sorry, there are no results for that selection.
          <br />
          <p>Click the "Home" or "back" button to try again.</p>
        </h2>
      );
    } else if (finalResults.length) {
      return <Results />;
    } else if (!finalResults.length) {
      return (
        <h2>
          <br />
          One moment while we play fetch...
          <br />
        </h2>
      );
    }
  };

  const clearForm = () => {
    setFinalResults([]);
  };

  const Routes = () => {
    const routes = useRoutes([
      {
        path: "/",
        element: (
          <>
            <NavBar />
            <Hero />
            <SearchBar />
            <Form />
            <Footer />
          </>
        ),
      },
      {
        path: "/results",
        // element: checkResults(),
        element: <Results />,
      },
      {
        path: "/favorites",
        element: (
          <>
            <NavBar />
            <Hero />
            <SearchBar />
            {/* <Favorites  favoritePets={favoritePets} /> */}
            = <Footer />
          </>
        ),
      },
    ]);
    return routes;
  };

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
