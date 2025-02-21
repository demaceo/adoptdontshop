import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAnimalTypes,
  fetchBreeds,
  fetchCompletedFormResults,
  fetchAnimalsByBreed,
} from "../../utils/apiRequests";
import "./Form.css";
import { FormData } from "../../utils/Types";

export default function Form() {
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableCoats, setAvailableCoats] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    type: "",
    breed: "",
    size: "",
    gender: [],
    age: [],
    coat: "",
    location: "",
    distance: "",
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
    spayedNeutered: false,
    houseTrained: false,
    specialNeeds: false,
    shotsCurrent: false,
    limit: 100,
  });

  const navigate = useNavigate();
  const clearFormData = () => {
    setFormData({
      type: "",
      breed: "",
      size: "",
      gender: [],
      age: [],
      coat: "",
      location: "",
      distance: "",
      goodWithChildren: false,
      goodWithDogs: false,
      goodWithCats: false,
      spayedNeutered: false,
      houseTrained: false,
      // declawed: false,
      specialNeeds: false,
      shotsCurrent: false,
      limit: 100,
    });
    setAvailableSizes([]);
    setAvailableCoats([]);
  };

  useEffect(() => {
    clearFormData();
    const loadAnimalTypes = async () => {
      const types = await fetchAnimalTypes();
      setAnimalTypes(types);
    };
    loadAnimalTypes();
  }, []);

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    clearFormData();
    const type = e.target.value;
    setFormData({ ...formData, type });
    const fetchedBreeds = await fetchBreeds(type);
    const uniqueBreeds = Array.from(new Set(fetchedBreeds)); // Remove duplicates using Set
    setBreeds(uniqueBreeds);
  };

  const handleBreedChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    setFormData({ ...formData, breed });
    const animalsData = await fetchAnimalsByBreed(breed);
    const sizes = Array.from(
      new Set(animalsData.map((animal: { size: string }) => animal.size))
    );
    const coats = Array.from(
      new Set(animalsData.map((animal: { coat: string }) => animal.coat))
    );
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
  const handleMultiSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "gender" | "age"
  ) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedValues = checked
        ? [...prevFormData[field], value] // Add if checked
        : prevFormData[field].filter((item) => item !== value); // Remove if unchecked

      return { ...prevFormData, [field]: updatedValues };
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

    const data = await fetchCompletedFormResults(params);
    navigate("/results", { state: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section visible">
        {/* //!Type field */}
        <label className="field-label">Type</label>
        <select name="type" value={formData.type} onChange={handleTypeChange}>
          <option value="">Select Animal Type</option>
          {animalTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {/* //!Breed: Only show after Type is selected */}
      {formData.type && (
        <div className={`form-section ${formData.type ? "visible" : ""}`}>
          <label className="field-label">Breed</label>
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
      )}
      {/* //! Additional Fields: Show after Breed is selected  */}
      {formData.breed && (
        <>
          <div className="checkbox-group">
            <div className={`form-section ${formData.breed ? "visible" : ""}`}>
              <label className="field-label">Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleSelectChange}
              >
                <option value="">Select Size</option>
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            {/* //! COAT */}
            <div className={`form-section ${formData.breed ? "visible" : ""}`}>
              <label className="field-label">Coat</label>
              <select
                name="coat"
                value={formData.coat}
                onChange={handleSelectChange}
              >
                <option value="">Select Coat</option>
                {availableCoats.map((coat) => (
                  <option key={coat} value={coat}>
                    {coat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
      {/* //! GENDER - Multi-select using checkboxes */}
      <div>
        <label className="field-label">Gender</label>
        <div>
          {["male", "female", "unknown"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="gender"
                value={option}
                checked={formData.gender.includes(option)}
                onChange={(e) => handleMultiSelect(e, "gender")}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </div>
      {/* //! AGE - Multi-select using checkboxes */}
      <div>
        <label className="field-label">Age</label>
        <div>
          {["baby", "young", "adult", "senior"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="age"
                value={option}
                checked={formData.age.includes(option)}
                onChange={(e) => handleMultiSelect(e, "age")}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* //! LOCATION */}
      <div>
        <label className="field-label">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter a city, state, OR zip code"
        />
      </div>
      {/* //! DISTANCE: Only Show if Location is Provided */}
      {formData.location && (
        <div className={`form-section ${formData.location ? "visible" : ""}`}>
          <label className="field-label">Distance</label>
          <div className="range-input-container">
            <input
              type="range"
              name="distance"
              min="0"
              max="500"
              value={formData.distance || 0}
              onChange={handleInputChange}
              className="range-input"
            />
            <span className="range-value">{formData.distance || 0} miles</span>
          </div>
        </div>
      )}

      {/* //! GOOD WITH: */}
      <div className="good-with-container">
        <label className="field-label">Good with:</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="goodWithChildren"
                checked={formData.goodWithChildren}
                onChange={handleInputChange}
              />
              Children
            </label>
          </div>

          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="goodWithDogs"
                checked={formData.goodWithDogs}
                onChange={handleInputChange}
              />
              Dogs
            </label>
          </div>

          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="goodWithCats"
                checked={formData.goodWithCats}
                onChange={handleInputChange}
              />
              Cats
            </label>
          </div>
        </div>
      </div>
      {/* //! ATTRIBUTES */}
      <div className="attributes-container">
        <label className="field-label">Attributes:</label>

        <div className="attributes-group">
          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="spayedneutered"
                checked={formData.spayedNeutered}
                onChange={handleInputChange}
              />
              Spayed/Neutered
            </label>
          </div>
          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="houseTrained"
                checked={formData.houseTrained}
                onChange={handleInputChange}
              />
              House Trained
            </label>
          </div>
          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="specialNeeds"
                checked={formData.specialNeeds}
                onChange={handleInputChange}
              />
              Special Needs
            </label>
          </div>
          <div className="checkbox-item">
            <label>
              <input
                type="checkbox"
                name="shotscurrent"
                checked={formData.shotsCurrent}
                onChange={handleInputChange}
              />
              Vaccinated
            </label>
          </div>
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
}
