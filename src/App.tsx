import { HashRouter, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./Components/Hero/Hero.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import Results from "./Components/Results/Results.tsx";
import Favorites from "./Components/Favorites/Favorites.tsx";
// import About from "./Components/About/About.tsx";
import Footer from "./Components/Footer/Footer.tsx";
// import Form from "./Components/Form/Form.tsx";
import PetDetails from "./Components/PetDetails/PetDetails";
import ConversationalForm from "./Components/ConversationalForm/ConversationalForm.tsx";

function App() {
  const [showCF, setShowCF] = useState(false);

  // Skip link functionality
  useEffect(() => {
    const skipLink = document.getElementById("skip-nav");
    if (skipLink) {
      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      });
    }
  }, []);

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key closes modal
      if (e.key === "Escape" && showCF) {
        setShowCF(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showCF]);

  const Routes = () => {
    const routes = useRoutes([
      {
        path: "*",
        element: (
          <>
            <a href="#main-content" className="skip-nav" id="skip-nav">
              Skip to main content
            </a>
            <div className="app-container">
              <NavBar />
              <main className="content" id="main-content" tabIndex={-1}>
                <Hero onChat={() => setShowCF(true)} />
                {/* <About /> */}
                {/* <Form /> */}
              </main>
              <Footer />
            </div>
          </>
        ),
      },
      {
        path: "/",
        element: (
          <>
            <a href="#main-content" className="skip-nav" id="skip-nav">
              Skip to main content
            </a>
            <div className="app-container">
              <NavBar />
              <main className="content" id="main-content" tabIndex={-1}>
                <Hero onChat={() => setShowCF(true)} />
                {showCF && (
                  <ConversationalForm
                    onClose={() => setShowCF(false)}
                    aria-label="Pet preferences questionnaire"
                  />
                )}
                {/* <About /> */}
                {/* <Form /> */}
              </main>
              <Footer />
            </div>
          </>
        ),
      },
      {
        path: "/results",
        element: (
          <>
            <a href="#main-content" className="skip-nav" id="skip-nav">
              Skip to main content
            </a>
            <NavBar />
            <main id="main-content" tabIndex={-1}>
              <Results />
            </main>
            <Footer />
          </>
        ),
      },
      {
        path: "/favorites",
        element: (
          <>
            <a href="#main-content" className="skip-nav" id="skip-nav">
              Skip to main content
            </a>
            <NavBar />
            <main id="main-content" tabIndex={-1}>
              <Favorites />
            </main>
            <Footer />
          </>
        ),
      },
      {
        path: "/pet-details/:id",
        element: (
          <>
            <a href="#main-content" className="skip-nav" id="skip-nav">
              Skip to main content
            </a>
            <NavBar />
            <main id="main-content" tabIndex={-1}>
              <PetDetails />
            </main>
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
