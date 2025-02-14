import { useLocation, useNavigate } from "react-router-dom";
import "./PetDetails.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function PetDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const pet = location.state?.pet;

  if (!pet) {
    return (
      <div className="pet-details-container">
        <h2>Pet Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="pet-details-container">
      <div className="pet-details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <FavoriteButton id={pet.id} petData={pet} />
      </div>
      <h2>{pet.name}</h2>
      {pet.primary_photo_cropped?.large ? (
        <img
          src={pet.primary_photo_cropped.large}
          alt={pet.name}
          loading="lazy"
        />
      ) : (
        <div className="no-pet-image">🐾</div>
      )}
      <p className="pet-tags">
        <strong>Tags:</strong> {pet.tags || "N/A"}
      </p>
      <p>
        <strong>Breed:</strong> {pet.breeds.primary}
      </p>
      <p>
        <strong>Age:</strong> {pet.age}
      </p>
      <p>
        <strong>Gender:</strong> {pet.gender}
      </p>
      <p>
        <strong>Size:</strong> {pet.size}
      </p>
      <p>
        <strong>Coat:</strong> {pet.coat || "Unknown"}
      </p>
      <p>
        <strong>Status:</strong> {pet.status}
      </p>
      <section className="contact-info-container">
        <h3 className="contact-info-header">Contact</h3>
        <p className="contact-info phone-number">
          <strong>Phone:</strong> <a href={`tel:${pet.contact.phone || ''}`}>{pet.contact.phone || ""}</a>
        </p>
        <p>
          <strong>Email:</strong> {pet.contact.email || "Not available"}
        </p>
        <p>
          <strong>Phone:</strong> {pet.contact.phone || "Not available"}
        </p>
      </section>
    </div>
  );
}
