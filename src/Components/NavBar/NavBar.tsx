import { Link, useLocation } from "react-router-dom";
import { ARIA_LABELS } from "../../utils/accessibility";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label={ARIA_LABELS.mainNavigation}
    >
      <div id="typewriter-container" className="logo">
        <Link
          id="typewriter-text"
          to="/"
          aria-label="Adopt Don't Shop - Go to homepage"
          className={location.pathname === "/" ? "active" : ""}
        >
          Adopt Don't Shop
        </Link>
      </div>
      <div className="nav-links" role="menubar">
        <Link
          to="/"
          role="menuitem"
          aria-current={location.pathname === "/" ? "page" : undefined}
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          role="menuitem"
          aria-current={location.pathname === "/favorites" ? "page" : undefined}
          className={location.pathname === "/favorites" ? "active" : ""}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
