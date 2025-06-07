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
  const [isLoading, setIsLoading] = useState(false);

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
    const uniqueBreeds = Array.from(new Set(fetchedBreeds));
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
        ? [...prevFormData[field], value]
        : prevFormData[field].filter((item) => item !== value);

      return { ...prevFormData, [field]: updatedValues };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof typeof formData;
        if (formData[typedKey] && formData[typedKey] !== "") {
          params.append(key, formData[typedKey].toString());
        }
      });

      const data = await fetchCompletedFormResults(params);
      navigate("/results", { state: data });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="form-section">
      <div className="form-container">
        <div className="form-header">
          <h2>Find Your Perfect Pet</h2>
          <p>
            Tell us what you're looking for, and we'll help you find your ideal
            companion
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`pet-form ${isLoading ? "form-loading" : ""}`}
        >
          {/* Basic Information */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">Animal Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
              >
                <option value="">Select Animal Type</option>
                {animalTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {formData.type && (
              <div
                className={`form-field form-step ${
                  formData.type ? "visible" : ""
                }`}
              >
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
          </div>

          {/* Additional Characteristics */}
          {formData.breed && (
            <div className="form-step visible">
              <div className="form-row">
                <div className="form-field">
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

                <div className="form-field">
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
            </div>
          )}

          <div className="form-divider">
            <span>Preferences</span>
          </div>

          {/* Gender Selection */}
          <div className="form-field">
            <label className="field-label">Gender</label>
            <div className="checkbox-group">
              {["male", "female", "unknown"].map((option) => (
                <label
                  key={option}
                  className={`checkbox-item ${
                    formData.gender.includes(option) ? "checked" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="gender"
                    value={option}
                    checked={formData.gender.includes(option)}
                    onChange={(e) => handleMultiSelect(e, "gender")}
                  />
                  <span className="checkbox-label">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Selection */}
          <div className="form-field">
            <label className="field-label">Age</label>
            <div className="checkbox-group">
              {["baby", "young", "adult", "senior"].map((option) => (
                <label
                  key={option}
                  className={`checkbox-item ${
                    formData.age.includes(option) ? "checked" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="age"
                    value={option}
                    checked={formData.age.includes(option)}
                    onChange={(e) => handleMultiSelect(e, "age")}
                  />
                  <span className="checkbox-label">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter city, state, or zip code"
              />
            </div>
          </div>

          {/* Distance Range */}
          {formData.location && (
            <div
              className={`form-field form-step ${
                formData.location ? "visible" : ""
              }`}
            >
              <label className="field-label">Search Distance</label>
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
                <span className="range-value">
                  {formData.distance || 0} miles
                </span>
              </div>
            </div>
          )}

          <div className="form-divider">
            <span>Compatibility & Care</span>
          </div>

          {/* Good With */}
          <div className="form-field">
            <label className="field-label">Good with</label>
            <div className="checkbox-group">
              <label
                className={`checkbox-item ${
                  formData.goodWithChildren ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="goodWithChildren"
                  checked={formData.goodWithChildren}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Children</span>
              </label>

              <label
                className={`checkbox-item ${
                  formData.goodWithDogs ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="goodWithDogs"
                  checked={formData.goodWithDogs}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Dogs</span>
              </label>

              <label
                className={`checkbox-item ${
                  formData.goodWithCats ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="goodWithCats"
                  checked={formData.goodWithCats}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Cats</span>
              </label>
            </div>
          </div>

          {/* Attributes */}
          <div className="form-field">
            <label className="field-label">Special Attributes</label>
            <div className="checkbox-group">
              <label
                className={`checkbox-item ${
                  formData.spayedNeutered ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="spayedNeutered"
                  checked={formData.spayedNeutered}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Spayed/Neutered</span>
              </label>

              <label
                className={`checkbox-item ${
                  formData.houseTrained ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="houseTrained"
                  checked={formData.houseTrained}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">House Trained</span>
              </label>

              <label
                className={`checkbox-item ${
                  formData.specialNeeds ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="specialNeeds"
                  checked={formData.specialNeeds}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Special Needs</span>
              </label>

              <label
                className={`checkbox-item ${
                  formData.shotsCurrent ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="shotsCurrent"
                  checked={formData.shotsCurrent}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Vaccinated</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find My Perfect Pet"}
          </button>
        </form>
      </div>
    </section>
  );
}
