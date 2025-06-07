import "./Hero.css";

interface HeroProps {
  onChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChat }) => {
  return (
    <section className="hero">
      <div className="floating-elements">
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1>Find Your Perfect Companion</h1>
          <p className="hero-subtitle">
            Connect with loving pets waiting for their forever home. Start your
            adoption journey today with personalized matches.
          </p>

          <div className="hero-actions">
            <button className="chat-btn" onClick={onChat}>
              Chat with Barkley
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Adoptions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Partner Shelters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className="tennis-ball-container">
          <div className="tennis-ball"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
