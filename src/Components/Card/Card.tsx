/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Card.css";
import { AnimalCard } from "../../utils/Types";
import { gsap } from "gsap";

const DEFAULT_IMAGE = (
  <svg
    fill="#000000"
    height="200px"
    width="200px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 228.804 228.804"
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <path d="M184.475,161.189c-2.368-3.731-19.724-30.767-34.558-45.068c-12.376-11.883-30.9-12.227-33-12.227 c-0.191,0.001-0.383,0.008-0.571,0.023h-4.491c-1.984,0-19.761,0.338-32.763,12.042C63.05,130.416,45.3,159.575,44.058,161.63 c-9.403,14.867-15.166,24.536-15.166,35.286c0,19.371,14.193,31.888,36.158,31.888h98.711c21.959,0,36.148-12.529,36.148-31.92 c0-10.845-5.777-20.5-15.205-35.353C184.63,161.415,184.554,161.3,184.475,161.189z M163.761,213.804H65.05 c-7.902,0-21.158-2.194-21.158-16.888c0-6.279,4.126-13.489,12.885-27.334c0.029-0.046,0.058-0.093,0.087-0.14 c0.175-0.29,17.631-29.146,32.267-42.336c8.925-8.034,22.597-8.187,22.73-8.188h5.08c0.143,0,0.284-0.004,0.426-0.012 c2.441,0.092,14.739,0.907,22.152,8.024c14.283,13.772,32.324,42.347,32.505,42.634c0.081,0.129,0.165,0.254,0.253,0.376 c9.316,14.698,12.633,21.018,12.633,26.942C184.909,210.868,173.408,213.804,163.761,213.804z"></path>{" "}
        <path d="M78.198,85.731c16.929,0,30.189-18.831,30.189-42.87C108.388,18.827,95.127,0,78.198,0 C61.271,0,48.011,18.827,48.011,42.861C48.011,66.901,61.271,85.731,78.198,85.731z M78.198,15 c7.184,0,15.189,11.442,15.189,27.861c0,16.424-8.006,27.87-15.189,27.87s-15.188-11.446-15.188-27.87 C63.011,26.442,71.015,15,78.198,15z"></path>{" "}
        <path d="M38.664,137.296c2.951,0,5.77-0.607,8.413-1.82c13.162-6.12,16.827-25.327,8.34-43.731 C48.832,77.493,36.65,67.918,25.101,67.918c-2.954,0-5.777,0.609-8.401,1.817C3.52,75.834-0.157,95.045,8.332,113.481 c6.585,14.244,18.774,23.814,30.33,23.815H38.664z M21.952,107.197c-5.076-11.024-3.635-21.683,1.033-23.842 c0.639-0.294,1.33-0.437,2.115-0.437c4.71,0,12.162,5.298,16.697,15.113c5.076,11.008,3.635,21.668-1.011,23.828 c-0.642,0.294-1.336,0.438-2.123,0.438C33.947,122.296,26.486,117,21.952,107.197z"></path>{" "}
        <path d="M150.591,85.731c16.923,0,30.18-18.831,30.18-42.87C180.771,18.827,167.514,0,150.591,0 c-16.939,0-30.207,18.827-30.207,42.861C120.384,66.901,133.652,85.731,150.591,85.731z M150.591,15 c7.18,0,15.18,11.442,15.18,27.861c0,16.424-8,27.87-15.18,27.87c-7.192,0-15.207-11.446-15.207-27.87 C135.384,26.442,143.399,15,150.591,15z"></path>{" "}
        <path d="M212.104,69.737c-2.617-1.212-5.447-1.827-8.411-1.827c-11.532,0-23.71,9.578-30.299,23.827 c-8.525,18.396-4.863,37.61,8.368,43.756c2.609,1.197,5.429,1.804,8.38,1.804c11.559,0,23.745-9.572,30.324-23.822 C228.962,95.052,225.287,75.839,212.104,69.737z M206.846,107.19c-4.53,9.812-11.987,15.106-16.704,15.106 c-0.788,0-1.482-0.143-2.093-0.423c-4.696-2.181-6.141-12.835-1.043-23.835c4.544-9.827,11.988-15.129,16.687-15.129 c0.781,0,1.47,0.143,2.107,0.438C210.484,85.517,211.926,96.175,206.846,107.19z"></path>{" "}
      </g>{" "}
    </g>
  </svg>
);

const isFavorited = (id: number) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.some((favorite: any) => favorite.id === id);
};
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
  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(
    isFavorited(id)
  );

  const animateAddFavorite = () => {
    const tl = gsap.timeline();
    gsap.set(`.${"--" + id}`, {
      //start animation state
      transition: "ease 0",
      transform: "rotate(0deg)",
    });

    tl.to(`.${"--" + id}`, { duration: 0.1, translateY: 3 })
      .to(`.${"--" + id}`, { duration: 0.3, rotateY: 360, translateY: -10 })
      .to(`.${"--" + id}`, { duration: 0.3, translateY: 0 })
      .to(
        `.${"--" + id}`,
        { duration: 0.2, filter: "grayscale(0%)", cursor: "default" },
        "-=.4"
      )
      .to(
        `.title-artist-${id}`,
        { duration: "0.2 !important", color: "rgb(253,235,103)" },
        "-=.4"
      )
      .to(
        `.badge-${id}`,
        {
          borderColor: "rgb(253,235,103)",
          backgroundColor: "rgb(253,235,103)",
          color: "rgb(40,44,52)",
        },
        "<"
      )
      .to(`.card-${id}`, { border: "solid 3px rgb(253,235,103)" }, "<")
      .to(`.${"--" + id}`, {
        ease: "none",
        duration: 8,
        repeat: -1,
        rotate: 360,
      });
    // setInFavorites(true);
  };

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
      favorites.push({
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
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavoritedState(!isFavoritedState);
    animateAddFavorite();
  };
  return (
    <div
      key={id}
      className={`card ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add the Favorite Button */}
      <button
        className={`favorite-btn ${isFavoritedState ? "favorited" : ""}`}
        onClick={handleFavorite}
        aria-label={
          isFavoritedState ? "Remove from favorites" : "Add to favorites"
        }
      >
        {isFavoritedState ? "★" : "☆"}
      </button>
      <h3>{name}</h3>
      <div className="card-image">
        {primary_photo_cropped?.small ? (
          <img src={primary_photo_cropped.small} alt={name} loading="lazy" />
        ) : (
          DEFAULT_IMAGE
        )}
      </div>
      <p>{description}</p>

      <div className="card-content">
        <div className={`card-details ${isHovered ? "show" : ""}`}>
          <p>
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
