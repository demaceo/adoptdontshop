/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { AnimalCard } from "../../utils/Types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
// import DEFAULT_IMAGE from "../../assets/default-card-img.jsx";

export default function Card({
  id,
  name,
  description,
  primary_photo_cropped,
  breeds = {
    primary: "Unknown",
    secondary: "",
    mixed: false,
    unknown: false,
  },
  colors = { primary: "Unknown", secondary: "", tertiary: "" },
  age = "Unknown",
  gender = "Unknown",
  size = "Unknown",
  coat = "Unknown",
  attributes = {
    spayed_neutered: false,
    house_trained: false,
    declawed: null,
    special_needs: false,
    shots_current: false,
  },
  tags,
  environment = { children: false, dogs: false, cats: false },
  status = "Unknown",
  published_at,
  contact = {
    address: {
      city: "Unknown",
      state: "N/A",
      address1: null,
      address2: null,
      postcode: "",
      country: "",
    },
    email: "",
    phone: null,
  },
}: AnimalCard) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
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
    <div
      key={id}
      className={`card card-${id} ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* the Favorite Button */}
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
      <h3 className={`pet-name-${id}`}>{name}</h3>
      <div
        className="card-image"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      >
        {primary_photo_cropped?.small ? (
          <img src={primary_photo_cropped.small} alt={name} loading="lazy" />
        ) : (
          <div className="no-card-image"> 🐾</div>
        )}
      </div>
      <p>{description}</p>

      <div className="card-content">
        <div className={`card-details ${isHovered ? "show" : ""}`}>
          <p className={`badge badge-${id}`}>
            <strong>Published:</strong>{" "}
            {new Date(published_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Located:</strong>{" "}
            {contact?.address
              ? `${contact.address.city}, ${contact.address.state}`
              : "Location Unavailable"}
          </p>
          <p>
            <strong>Breed:</strong> {breeds?.primary || "Unknown"}{" "}
            {breeds?.secondary || ""}
          </p>
          <p>
            <strong>Mixed:</strong>{" "}
            {breeds?.mixed !== undefined ? `${breeds.mixed}` : "Unknown"}
          </p>
          <p>
            <strong>Colors:</strong> {colors?.primary || "Unknown"}{" "}
            {colors?.secondary && `/ ${colors.tertiary}`}
          </p>
          <p>
            <strong>Age:</strong> {age || "Unknown"}
          </p>
          <p>
            <strong>Gender:</strong> {gender || "Unknown"}
          </p>
          <p>
            <strong>Size:</strong> {size || "Unknown"}
          </p>
          <p>
            <strong>Coat:</strong> {coat || "Unknown"}
          </p>
          <p>
            <strong>Spayed/Neutered:</strong>{" "}
            {attributes?.spayed_neutered ? "Yes" : "No"}
          </p>
          <p>
            <strong>House Trained:</strong>{" "}
            {attributes?.house_trained ? "Yes" : "No"}
          </p>
          <p>
            <strong>Tags:</strong> {tags.length > 0 ? tags.join(", ") : "None"}
          </p>
          <p>
            <strong>Good With:</strong> Children:{" "}
            {environment?.children ? "Yes" : "No"}, Dogs:{" "}
            {environment?.dogs ? "Yes" : "No"}, Cats:{" "}
            {environment?.cats ? "Yes" : "No"}
          </p>
          <p>
            <strong>Status:</strong> {status || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
// example of data.animals[0]:
// {
//     "id": 74691411,
// !    "organization_id": "NV188",
// !    "url": "https://www.petfinder.com/dog/kota-74691411/nv/silver-springs/lyon-county-animal-services-nv188/?referrer_id=5d7e2547-8c8b-4c56-959f-11bbabafda5a&utm_source=api&utm_medium=partnership&utm_content=5d7e2547-8c8b-4c56-959f-11bbabafda5a",
//     "type": "Dog",
//     "species": "Dog",
//    "breeds": {
//        "primary": "Husky",
//        "secondary": null,
//        "mixed": true,
//         "unknown": false
//     },
//     "colors": {
//         "primary": "Black",
//         "secondary": "White / Cream",
//         "tertiary": null
//     },
//  !   "age": "Adult",
// !    "gender": "Male",
// !    "size": "Large",
// !    "coat": "Long",
//     "attributes": {
//         "spayed_neutered": true,
//         "house_trained": false,
//         "declawed": null,
//         "special_needs": false,
//         "shots_current": true
//     },
//     "environment": {
//         "children": null,
//         "dogs": true,
//         "cats": null
//     },
//  !   "tags": [
//         "Athletic",
//         "Brave",
//         "Curious",
//         "Friendly",
//         "Funny",
//         "Independent",
//         "Playful",
//         "Smart"
//     ],
//     "name": "Kota",
//     "description": null,
//     "organization_animal_id": null,
//  !   "photos": [
//         {
//             "small": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=100",
//             "medium": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=300",
//             "large": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=600",
//             "full": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991"
//         },
//         {
//             "small": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/46e39c39-6c26-4316-83b3-416bfd301eb4.jpg?versionId=2FGyEgptMNPC1msstbwOgSPCoRG9Etty&bust=1736355992&width=100",
//             "medium": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/46e39c39-6c26-4316-83b3-416bfd301eb4.jpg?versionId=2FGyEgptMNPC1msstbwOgSPCoRG9Etty&bust=1736355992&width=300",
//             "large": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/46e39c39-6c26-4316-83b3-416bfd301eb4.jpg?versionId=2FGyEgptMNPC1msstbwOgSPCoRG9Etty&bust=1736355992&width=600",
//             "full": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/46e39c39-6c26-4316-83b3-416bfd301eb4.jpg?versionId=2FGyEgptMNPC1msstbwOgSPCoRG9Etty&bust=1736355992"
//         },
//         {
//             "small": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/ac786e9d-0663-4cfa-8235-fb30554e0731.jpg?versionId=uV6Ps4M35IXDywTAKe0VwXUHUoiYXBhu&bust=1736355992&width=100",
//             "medium": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/ac786e9d-0663-4cfa-8235-fb30554e0731.jpg?versionId=uV6Ps4M35IXDywTAKe0VwXUHUoiYXBhu&bust=1736355992&width=300",
//             "large": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/ac786e9d-0663-4cfa-8235-fb30554e0731.jpg?versionId=uV6Ps4M35IXDywTAKe0VwXUHUoiYXBhu&bust=1736355992&width=600",
//             "full": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/ac786e9d-0663-4cfa-8235-fb30554e0731.jpg?versionId=uV6Ps4M35IXDywTAKe0VwXUHUoiYXBhu&bust=1736355992"
//         }
//     ],
//     "primary_photo_cropped": {
//         "small": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=300",
//         "medium": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=450",
//         "large": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991&width=600",
//         "full": "https://dbw3zep4prcju.cloudfront.net/animal/292381fa-eb41-481e-b139-7a99a7697e1f/image/b1026ca6-00e7-4fa3-9e12-4c6d08c3842b.jpg?versionId=n5D1f9qwqouPUeZrCRQvRP2_wy4jPsHr&bust=1736355991"
//     },
//     "videos": [],
// !    "status": "adoptable",
//     "status_changed_at": "2025-01-08T17:07:17+0000",
// !    "published_at": "2025-01-08T17:07:16+0000",
//     "distance": null,
// !    "contact": {
//         "email": "NCates@Lyon-County.org",
//         "phone": "775-577-5005",
//         "address": {
//             "address1": "3705 Highway 50 West",
//             "address2": null,
//             "city": "Silver Springs",
//             "state": "NV",
//             "postcode": "89429",
//             "country": "US"
//         }
//     },
//     "_links": {
//         "self": {
//             "href": "/v2/animals/74691411"
//         },
//         "type": {
//             "href": "/v2/types/dog"
//         },
//         "organization": {
//             "href": "/v2/organizations/nv188"
//         }
//     }
// }
