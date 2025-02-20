import { HashRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import Results from "./Components/Results/Results.tsx";
import Favorites from "./Components/Favorites/Favorites.tsx";
import About from "./Components/About/About.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";
import PetDetails from "./Components/PetDetails/PetDetails";

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
        path: "*",
        element: (
          <div className="app-container">
            <NavBar />
            <main className="content">
              <Hero />
              <About />
              <Form />
            </main>
            <Footer />
          </div>
        ),
      },
      {
        path: "/",
        element: (
          <div className="app-container">
            <NavBar />
            <main className="content">
              <Hero />
              <About />
              <Form />
            </main>
            <Footer />
          </div>
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
            <Favorites />
            <Footer />
          </>
        ),
      },
      {
        path: "/pet-details/:id",
        element: (
          <>
            <NavBar />
            <PetDetails />
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
