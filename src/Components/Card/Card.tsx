import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { AnimalCard } from "../../utils/Types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ARIA_DESCRIPTIONS, KEYBOARD_KEYS } from "../../utils/accessibility";

// Utility: sanitize and truncate text
const sanitize = (html: string = "") =>
  html
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&#8217;|&#8221;|&amp;#39;|&quot;|&#039;/g, "'")
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
      e.preventDefault();
      handleView();
    }
  };

  const handleToggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleToggleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
      e.preventDefault();
      handleToggleExpanded();
    }
  };

  const cardId = `pet-card-${id}`;
  const detailsId = `pet-details-${id}`;

  return (
    <article
      className={`card${expanded ? " expanded" : ""}`}
      aria-labelledby={`${cardId}-title`}
      aria-describedby={`${cardId}-description`}
      role="article"
    >
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
        onKeyDown={handleKeyPress}
        aria-label={`View full profile for ${name}`}
        aria-describedby={ARIA_DESCRIPTIONS.petCard}
        role="button"
        tabIndex={0}
      >
        {primary_photo_cropped?.small ? (
          <img
            src={primary_photo_cropped.small}
            alt={`Photo of ${name}, a ${breeds.primary}${
              breeds.secondary ? ` ${breeds.secondary} mix` : ""
            }`}
            loading="lazy"
          />
        ) : (
          <div
            className="no-card-image"
            aria-label={`No photo available for ${name}`}
            role="img"
          >
            🐾
          </div>
        )}
      </div>
      <h3 id={`${cardId}-title`} className="card-title">
        {sanitize(name)}
      </h3>
      <p id={`${cardId}-description`} className="card-description">
        {sanitize(description || "No description provided.")}
      </p>
      <button
        className="card-button"
        onClick={handleToggleExpanded}
        onKeyDown={handleToggleKeyPress}
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={
          expanded ? `Hide details for ${name}` : `Show details for ${name}`
        }
      >
        {expanded ? "Hide Details" : "View Details"}
      </button>
      {expanded && (
        <div
          id={detailsId}
          className="card-details"
          role="region"
          aria-label={`Detailed information about ${name}`}
        >
          <dl aria-label="Pet information details">
            <dt>Published:</dt>
            <dd>{new Date(published_at).toLocaleDateString()}</dd>

            <dt>Location:</dt>
            <dd>
              {contact.address.city}, {contact.address.state}
            </dd>

            <dt>Breed:</dt>
            <dd>
              {breeds.primary}
              {breeds.secondary ? ` / ${breeds.secondary}` : ""}
            </dd>

            <dt>Age:</dt>
            <dd>{age}</dd>

            <dt>Gender:</dt>
            <dd>{gender}</dd>

            <dt>Size:</dt>
            <dd>{size}</dd>

            <dt>Coat:</dt>
            <dd>{coat}</dd>

            <dt>Spayed/Neutered:</dt>
            <dd>{attributes.spayed_neutered ? "Yes" : "No"}</dd>

            <dt>House Trained:</dt>
            <dd>{attributes.house_trained ? "Yes" : "No"}</dd>

            <dt>Good With:</dt>
            <dd>
              Children: {environment.children ? "Yes" : "No"}, Dogs:{" "}
              {environment.dogs ? "Yes" : "No"}, Cats:{" "}
              {environment.cats ? "Yes" : "No"}
            </dd>
          </dl>

          {tags.length > 0 && (
            <div
              className="card-tags"
              role="list"
              aria-label="Pet characteristics"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  aria-label={`Characteristic: ${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Card;
