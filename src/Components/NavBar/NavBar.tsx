import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Adopt Don't Shop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {/* <Link to="/vibe-check">Vibe Check</Link> */}
        <Link to="/favorites">Favorites</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Log-In / Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
