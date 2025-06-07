import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { AnimalCard } from "../../utils/Types";
import "./PetDetails.css";

// Utility: sanitize and truncate text
const sanitize = (html: string = "") =>
  html
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&#8217;|&#8221;|&amp;#39;|&#039;/g, "'")
    .replace(/&#8212;|&#8211;/g, "—")
    .slice(0, 500) + (html.length > 500 ? "…" : "");

export default function PetDetails() {
  const navigate = useNavigate();
  const locationState = useLocation().state as { pet?: AnimalCard };
  const pet = locationState?.pet;

  if (!pet) {
    return (
      <div className="pet-details-container">
        <div className="pet-details-content">
          <div className="pet-details-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              ⟵ Go Back
            </button>
          </div>
          <div className="pet-details-main">
            <div className="pet-hero">
              <h2 className="pet-name">Pet Not Found</h2>
              <p>The pet you're looking for could not be found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const details = [
    {
      label: "Breed",
      value: `${pet.breeds.primary}${
        pet.breeds.secondary ? ` / ${pet.breeds.secondary}` : ""
      }`,
    },
    { label: "Age", value: pet.age },
    { label: "Gender", value: pet.gender },
    { label: "Size", value: pet.size },
    { label: "Coat", value: pet.coat || "Unknown" },
    {
      label: "Spayed/Neutered",
      value: pet.attributes.spayed_neutered ? "Yes" : "No",
    },
    {
      label: "House Trained",
      value: pet.attributes.house_trained ? "Yes" : "No",
    },
    {
      label: "Special Needs",
      value: pet.attributes.special_needs ? "Yes" : "No",
    },
    { label: "Vaccinated", value: pet.attributes.shots_current ? "Yes" : "No" },
  ];

  return (
    <div className="pet-details-container">
      <div className="pet-details-content">
        <div className="pet-details-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ⟵ Back to Results
          </button>
          <FavoriteButton id={pet.id} petData={pet} />
        </div>

        <div className="pet-details-main">
          <div className="pet-hero">
            <h2 className="pet-name">{pet.name}</h2>

            <div className="pet-image">
              {pet.primary_photo_cropped?.large ? (
                <img
                  src={pet.primary_photo_cropped.large}
                  alt={pet.name}
                  loading="lazy"
                />
              ) : (
                <div className="no-pet-image">🐾</div>
              )}
            </div>

            <div className="pet-info">
              {pet.description && (
                <div className="pet-description">
                  <h3>About {pet.name}</h3>
                  <p>{sanitize(pet.description)}</p>
                  <button
                    className="external-link-button"
                    onClick={() => window.open(pet.url, "_blank")}
                  >
                    View on Petfinder
                  </button>
                </div>
              )}

              {pet.tags?.length > 0 && (
                <div className="pet-tags">
                  <h3>Personality Traits</h3>
                  <ul>
                    {pet.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pet-details-list">
          <h3>Pet Details</h3>
          <dl>
            {details.map(({ label, value }) => (
              <div key={label} className="detail-item">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="contact-info-container">
          <h3>Contact Information</h3>
          <div className="contact-grid">
            <div className="contact-item">
              <strong>Phone</strong>
              {pet.contact.phone ? (
                <a href={`tel:${pet.contact.phone}`}>📞 {pet.contact.phone}</a>
              ) : (
                <span>📞 Not Available</span>
              )}
            </div>

            <div className="contact-item">
              <strong>Email</strong>
              {pet.contact.email ? (
                <a href={`mailto:${pet.contact.email}`}>
                  ✉️ {pet.contact.email}
                </a>
              ) : (
                <span>✉️ Not Available</span>
              )}
            </div>

            <div className="contact-item">
              <strong>Location</strong>
              <span>
                📍 {pet.contact.address.city}, {pet.contact.address.state}{" "}
                {pet.contact.address.postcode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
