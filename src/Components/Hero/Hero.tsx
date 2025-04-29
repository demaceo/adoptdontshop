import "./Hero.css";

interface HeroProps {
  onChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChat }) => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Adopt a Pet, Change a Life</h1>
        <p>Furry friends are waiting for you!</p>
        <button className="chat-btn" onClick={onChat}>
          Chat with Barkley
        </button>
      </div>

      <div className="tennis-ball-container">
        <div className="tennis-ball"></div>
      </div>
    </div>
  );
};

export default Hero;
