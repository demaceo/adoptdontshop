import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { AnimalCard } from "../../utils/Types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

// Utility: sanitize and truncate text
const sanitize = (html: string = "") =>
  html
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&#8217;|&#8221;|&amp;#39;|&#039;/g, "'")
    .replace(/&#8212;|&#8211;/g, "—")
    .slice(0, 200) + (html.length > 200 ? "…" : "");

const Card: FC<AnimalCard> = ({
  id,
  name,
  description,
  primary_photo_cropped,
  breeds,
  colors,
  age,
  gender,
  size,
  coat,
  attributes,
  tags,
  environment,
  status,
  published_at,
  contact,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/pet-details/${id}`, {
      state: {
        pet: {
          id,
          name,
          description,
          primary_photo_cropped,
          breeds,
          colors,
          age,
          gender,
          size,
          coat,
          attributes,
          tags,
          environment,
          status,
          published_at,
          contact,
        },
      },
    });
  };

  return (
    <article className={`card${expanded ? " expanded" : ""}`}>
      <FavoriteButton
        id={id}
        petData={{
          id,
          name,
          description,
          primary_photo_cropped,
          breeds,
          colors,
          age,
          gender,
          size,
          coat,
          attributes,
          tags,
          environment,
          status,
          published_at,
          contact,
        }}
      />
      <div
        className="card-image"
        onClick={handleView}
        aria-label={`View details for ${name}`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleView()}
      >
        {primary_photo_cropped?.small ? (
          <img src={primary_photo_cropped.small} alt={name} loading="lazy" />
        ) : (
          <div className="no-card-image" aria-hidden>
            🐾
          </div>
        )}
      </div>
      <h3 className="card-title">{sanitize(name)}</h3>
      <p className="card-description">
        {sanitize(description || "No description provided.")}
      </p>
      <button className="card-button" onClick={() => setExpanded((e) => !e)}>
        {expanded ? "Hide Details" : "View Details"}
      </button>
      {expanded && (
        <div className="card-details">
          <p>
            <strong>Published:</strong>{" "}
            {new Date(published_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {contact.address.city},{" "}
            {contact.address.state}
          </p>
          <p>
            <strong>Breed:</strong> {breeds.primary}
            {breeds.secondary ? ` / ${breeds.secondary}` : ""}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>Size:</strong> {size}
          </p>
          <p>
            <strong>Coat:</strong> {coat}
          </p>
          <p>
            <strong>Spayed/Neutered:</strong>{" "}
            {attributes.spayed_neutered ? "Yes" : "No"}
          </p>
          <p>
            <strong>House Trained:</strong>{" "}
            {attributes.house_trained ? "Yes" : "No"}
          </p>
          <p>
            <strong>Good With:</strong> Children:{" "}
            {environment.children ? "Yes" : "No"}, Dogs:{" "}
            {environment.dogs ? "Yes" : "No"}, Cats:{" "}
            {environment.cats ? "Yes" : "No"}
          </p>
          {tags.length > 0 && (
            <div className="card-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Card;
