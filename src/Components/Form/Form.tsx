import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {
  fetchAnimalTypes,
  fetchBreeds,
  fetchAnimalsByBreed,
} from "../../utils/apiRequests";
import "./Form.css";

export default function Form() {
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableCoats, setAvailableCoats] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    size: "",
    gender: "",
    age: "",
    coat: "",
    location: "",
    distance: 100,
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
    houseTrained: false,
    declawed: false,
    specialNeeds: false,
  });

  const navigate = useNavigate(); // Used for redirecting to the results page

  useEffect(() => {
    const loadAnimalTypes = async () => {
      const types = await fetchAnimalTypes();
      setAnimalTypes(types);
    };
    loadAnimalTypes();
  }, []);

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setFormData({ ...formData, type });
    // Fetch breeds for selected type and remove duplicates
    const fetchedBreeds = await fetchBreeds(type);
    const uniqueBreeds = Array.from(new Set(fetchedBreeds)); // Remove duplicates using Set
    setBreeds(uniqueBreeds);
  };

  const handleBreedChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    setFormData({ ...formData, breed });
    // Fetch animals for the selected breed and update Size & Coat
    const animalsData = await fetchAnimalsByBreed(breed);
    // Extract unique size and coat values from the animals' data
    const sizes = Array.from(
      new Set(animalsData.map((animal: { size: string }) => animal.size))
    );
    const coats = Array.from(
      new Set(animalsData.map((animal: { coat: string }) => animal.coat))
    );

    // Update available sizes and coats
    setAvailableSizes(sizes);
    setAvailableCoats(coats);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      if (formData[typedKey] && formData[typedKey] !== "") {
        params.append(key, formData[typedKey].toString());
      }
    });

    const response = await fetch(
      `https://api.petfinder.com/v2/animals?${params.toString()}`
    );
    const data = await response.json();
    navigate("/results", { state: { animals: data.animals } });
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log("Form submitted with: ", formData);
  //   };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleTypeChange}>
          <option value="">Select Animal Type</option>
          {animalTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Breed</label>
        <select
          name="breed"
          value={formData.breed}
          onChange={handleBreedChange}
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Size</label>
        <select name="size" value={formData.size} onChange={handleSelectChange}>
          <option value="">Select Size</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Coat</label>
        <select name="coat" value={formData.coat} onChange={handleSelectChange}>
          <option value="">Select Coat</option>
          {availableCoats.map((coat) => (
            <option key={coat} value={coat}>
              {coat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="unknown"
              checked={formData.gender === "unknown"}
              onChange={handleInputChange}
            />
            Unknown
          </label>
        </div>
      </div>

      <div>
        <label>Age</label>
        <div>
          <label>
            <input
              type="radio"
              name="age"
              value="baby"
              checked={formData.age === "baby"}
              onChange={handleInputChange}
            />
            Baby
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="young"
              checked={formData.age === "young"}
              onChange={handleInputChange}
            />
            Young
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="adult"
              checked={formData.age === "adult"}
              onChange={handleInputChange}
            />
            Adult
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="senior"
              checked={formData.age === "senior"}
              onChange={handleInputChange}
            />
            Senior
          </label>
        </div>
      </div>

      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Distance (miles)</label>
        <input
          type="number"
          name="distance"
          value={formData.distance}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="goodWithChildren"
            checked={formData.goodWithChildren}
            onChange={handleInputChange}
          />
          Good with children
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="goodWithDogs"
            checked={formData.goodWithDogs}
            onChange={handleInputChange}
          />
          Good with dogs
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="goodWithCats"
            checked={formData.goodWithCats}
            onChange={handleInputChange}
          />
          Good with cats
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="houseTrained"
            checked={formData.houseTrained}
            onChange={handleInputChange}
          />
          House trained
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="declawed"
            checked={formData.declawed}
            onChange={handleInputChange}
          />
          Declawed
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="specialNeeds"
            checked={formData.specialNeeds}
            onChange={handleInputChange}
          />
          Special needs
        </label>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
