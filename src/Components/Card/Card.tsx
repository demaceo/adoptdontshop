/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Card.css";
import { AnimalCard } from "../../utils/Types";

const isFavorited = (id: number) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.some((favorite: any) => favorite.id === id);
};
export default function Card({
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
}: AnimalCard) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(
    isFavorited(id)
  );
  // Function to handle favoriting the animal
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavoritedState) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favorite: any) => favorite.id !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push({ id, name, primary_photo_cropped });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavoritedState(!isFavoritedState);
  };
  return (
    <div
      key={id}
      className={`card ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-image">
        <img src={primary_photo_cropped?.small} alt={name} />
      </div>
      <div className="card-content">
        <div className={`card-details ${isHovered ? "show" : ""}`}>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(published_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Located:</strong>{" "}
            {`${contact.address.city}, ${contact.address.state}`}
          </p>
          <p>
            <strong>Breed:</strong> {breeds.primary} {breeds.secondary}
          </p>
          <p>
            <strong>Mixed:</strong> {`${breeds.mixed}`}
          </p>
          <p>
            <strong>Colors:</strong> {colors.primary}{" "}
            {colors.secondary && `/ ${colors.tertiary}`}
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
            <strong>Tags:</strong> {tags.join(", ")}
          </p>
          <p>
            <strong>Good With:</strong> Children:{" "}
            {environment.children ? "Yes" : "No"}, Dogs:{" "}
            {environment.dogs ? "Yes" : "No"}, Cats:{" "}
            {environment.cats ? "Yes" : "No"}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
        {/* Add the Favorite Button */}
        <button
          className={`favorite-btn ${isFavoritedState ? "favorited" : ""}`}
          onClick={handleFavorite}
        >
          {isFavoritedState ? "★" : "☆"} {/* Simple star icon */}
        </button>
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
