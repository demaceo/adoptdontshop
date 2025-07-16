import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">
            <span className="title-line">NEURAL</span>
            <span className="title-line glow">ADOPTION</span>
            <span className="title-line">PROTOCOL</span>
          </h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              <span className="highlight-text">Adopt Don't Shop</span>{" "}
              interfaces with loving entities waiting for permanent neural
              bonds. Our quantum algorithms optimize the adoption matrix, making
              the synchronization process seamless and transparent.
            </p>

            <p className="about-mission">
              By linking consciousness with rescue networks, we forge lasting
              cybernetic relationships between humans and companion units.
            </p>

            <div className="cta-container">
              <div className="cta-text">
                <span className="cta-icon">⚡</span>
                <strong>INITIATE COMPANION SCAN PROTOCOL</strong>
              </div>
              <div className="scan-line"></div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number" data-value="10000+">
                <span className="counter">10,000+</span>
              </div>
              <div className="stat-label">COMPANIONS SYNCED</div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card">
              <div className="stat-number" data-value="500+">
                <span className="counter">500+</span>
              </div>
              <div className="stat-label">ACTIVE SHELTERS</div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card">
              <div className="stat-number" data-value="99.8%">
                <span className="counter">99.8%</span>
              </div>
              <div className="stat-label">SUCCESS RATE</div>
              <div className="stat-glow"></div>
            </div>
          </div>

          <div className="pet-matrix">
            <div
              className="matrix-icon"
              style={{ "--delay": "0s" } as React.CSSProperties}
            >
              🐕
            </div>
            <div
              className="matrix-icon"
              style={{ "--delay": "0.5s" } as React.CSSProperties}
            >
              🐱
            </div>
            <div
              className="matrix-icon"
              style={{ "--delay": "1s" } as React.CSSProperties}
            >
              🐰
            </div>
            <div
              className="matrix-icon"
              style={{ "--delay": "1.5s" } as React.CSSProperties}
            >
              🐦
            </div>
            <div
              className="matrix-icon"
              style={{ "--delay": "2s" } as React.CSSProperties}
            >
              🐹
            </div>
          </div>
        </div>
      </div>

      <div className="neural-grid"></div>
      <div className="particles"></div>
    </section>
  );
};

export default About;
