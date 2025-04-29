import React from "react";
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
    .slice(0, 200) + (html.length > 200 ? "…" : "");


export default function PetDetails() {
  const navigate = useNavigate();
  const locationState = useLocation().state as { pet?: AnimalCard };
  const pet = locationState?.pet;

  if (!pet) {
    return (
      <section className="pet-details-container">
        <header className="pet-details-header">
          <h2>Pet Not Found</h2>
        </header>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </section>
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
    <section className="pet-details-container">
      <header className="pet-details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⟵ Back
        </button>
        <FavoriteButton id={pet.id} petData={pet} />
      </header>

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

      {pet.description && (
        <article className="pet-description">
          <h3>Bio</h3>
          <p>
            {sanitize(pet.description)}{" "}
            <button
              className="external-link-button"
              onClick={() => window.open(pet.url, "_blank")}
            >
              View on Petfinder
            </button>
          </p>
        </article>
      )}

      {pet.tags?.length > 0 && (
        <div className="pet-tags">
          <h3>Tags</h3>
          <ul>
            {pet.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pet-details-list">
        <h3>Details</h3>
        <dl>
          {details.map(({ label, value }) => (
            <div key={label} className="detail-item">
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="contact-info-container">
        <h3>Contact Information</h3>
        <p>
          <strong>Phone:</strong>{" "}
          {pet.contact.phone ? (
            <a href={`tel:${pet.contact.phone}`}>{pet.contact.phone}</a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {pet.contact.email ? (
            <a href={`mailto:${pet.contact.email}`}>{pet.contact.email}</a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Location:</strong> {pet.contact.address.city},{" "}
          {pet.contact.address.state} {pet.contact.address.postcode}
        </p>
      </section>
    </section>
  );
}
