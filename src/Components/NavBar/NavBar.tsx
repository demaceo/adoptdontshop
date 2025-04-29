/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  onChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChat }) => {
  return (
    <nav className="navbar">
      <div id="typewriter-container" className="logo">
        <Link id="typewriter-text" to="/">
          Adopt Don't Shop
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {/* <button className="chat-btn" onClick={onChat}>
          SEARCH
        </button> */}
        <Link to="/favorites">Favorites</Link>
        {/* <Link to="/login">Log-In / Sign Up</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
