import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import SearchBar from "./Components/Search/SearchBar.tsx";
import Results from "./Components/Results/Results.tsx";
// import Favorites from "./Components/Favorites/Favorites.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";
import ThemeProvider from "./context/ThemeContext";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle.tsx";
import { useContext } from "react";
function App() {
  const { theme } = useContext(ThemeProvider);
  // const [finalResults, setFinalResults] = useState<any[]>([]);
  // const [favoritePets, setFavoritePets] = useState([]);
  // const [localStorage, setLocalStorage] = useLocalStorage("favorites");

  // useEffect(() => {
  //   let storedFavs: any = localStorage;
  //   storedFavs = storedFavs ? storedFavs : [];
  //   setFavoritePets(storedFavs);
  // }, [localStorage]);

  const Routes = () => {
    const routes = useRoutes([
      {
        path: "/",
        element: (
          <div className={theme === "dark" ? "dark" : "light"}>
            <ThemeToggle />
            <NavBar />
            <Hero />
            <Form />
            <Footer />
          </div>
        ),
      },
      {
        path: "/results",
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
