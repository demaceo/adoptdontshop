import { useLocation, useNavigate } from "react-router-dom";
import "./PetDetails.css";

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
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <h2>{pet.name}</h2>
      <img
        src={
          pet.primary_photo_cropped?.large || "https://via.placeholder.com/300"
        }
        alt={pet.name}
      />
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
      <p>
        <strong>Location:</strong> {pet.contact.address.city},{" "}
        {pet.contact.address.state}
      </p>
      <p>
        <strong>Email:</strong> {pet.contact.email || "Not available"}
      </p>
      <p>
        <strong>Phone:</strong> {pet.contact.phone || "Not available"}
      </p>
    </div>
  );
}
