import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import SearchBar from "./Components/Search/SearchBar.tsx";
import Results from "./Components/Results/Results.tsx";
// import Favorites from "./Components/Favorites/Favorites.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";

function App() {
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
