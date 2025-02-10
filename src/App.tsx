import { HashRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
// import SearchBar from "./Components/Search/SearchBar.tsx";
import Results from "./Components/Results/Results.tsx";
import Favorites from "./Components/Favorites/Favorites.tsx";
import About from "./Components/About/About.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";
// import { useEffect, useState } from "react";

function App() {
  // const [favoritePets, setFavoritePets] = useState([]);
  // const [localStorage, setLocalStorage] = useLocalStorage("favorites");

  // useEffect(() => {
  //   const storedFavorites = JSON.parse(
  //     localStorage.getItem("favorites") || "[]"
  //   );
  //   setFavoritePets(storedFavorites);
  // }, []);

  const Routes = () => {
    const routes = useRoutes([
      {
        path: "/",
        element: (
          <>
            <NavBar />
            <Hero />
            <About />
            <Form />
            <Footer />
          </>
        ),
      },
      {
        path: "/results",
        element: (
          <>
            <NavBar />
            <Results />
            <Footer />
          </>
        ),
      },
      {
        path: "/favorites",
        element: (
          <>
            <NavBar />
            {/* <SearchBar /> */}
            <Favorites />
            <Footer />
          </>
        ),
      },
    ]);
    return routes;
  };

  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}

export default App;
