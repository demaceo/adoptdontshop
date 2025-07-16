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
    <section className="form-section" id="companion-scan">
      <div className="neural-background">
        <div className="scan-grid"></div>
        <div className="data-streams"></div>
        <div className="hologram-particles"></div>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            <span className="title-glow">COMPANION</span>
            <span className="title-matrix">SCAN</span>
            <span className="title-protocol">PROTOCOL</span>
          </h2>
          <div className="title-circuit"></div>
          <p className="form-subtitle">
            <span className="highlight-accent">
              Initializing neural interface...
            </span>
            Configure your optimal companion parameters for quantum matching
          </p>
          <div className="scan-indicator">
            <div className="scan-bar"></div>
            <span className="scan-text">SCANNING AVAILABLE ENTITIES</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`neural-form ${isLoading ? "form-processing" : ""}`}
        >
          <div className="form-matrix">
            {/* Primary Classification Module */}
            <div className="matrix-section" data-section="primary">
              <div className="section-header">
                <h3 className="section-title">
                  <span className="section-icon">🧬</span>
                  PRIMARY CLASSIFICATION
                </h3>
                <div className="section-line"></div>
              </div>

              <div className="form-grid">
                <div className="neural-field">
                  <label className="field-label">
                    <span className="label-text">ENTITY TYPE</span>
                    <span className="label-circuit"></span>
                  </label>
                  <div className="input-container">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleTypeChange}
                      className="neural-select"
                    >
                      <option value="">► Select Entity Type</option>
                      {animalTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="field-glow"></div>
                  </div>
                </div>

                {formData.type && (
                  <div
                    className={`neural-field data-step ${
                      formData.type ? "active" : ""
                    }`}
                  >
                    <label className="field-label">
                      <span className="label-text">GENETIC VARIANT</span>
                      <span className="label-circuit"></span>
                    </label>
                    <div className="input-container">
                      <select
                        name="breed"
                        value={formData.breed}
                        onChange={handleBreedChange}
                        className="neural-select"
                      >
                        <option value="">► Select Genetic Variant</option>
                        {breeds.map((breed) => (
                          <option key={breed} value={breed}>
                            {breed}
                          </option>
                        ))}
                      </select>
                      <div className="field-glow"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Physical Parameters Module */}
            {formData.breed && (
              <div
                className="matrix-section data-step active"
                data-section="physical"
              >
                <div className="section-header">
                  <h3 className="section-title">
                    <span className="section-icon">⚗️</span>
                    PHYSICAL PARAMETERS
                  </h3>
                  <div className="section-line"></div>
                </div>

                <div className="form-grid">
                  <div className="neural-field">
                    <label className="field-label">
                      <span className="label-text">DIMENSIONAL CLASS</span>
                      <span className="label-circuit"></span>
                    </label>
                    <div className="input-container">
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleSelectChange}
                        className="neural-select"
                      >
                        <option value="">► Select Dimensional Class</option>
                        {availableSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <div className="field-glow"></div>
                    </div>
                  </div>

                  <div className="neural-field">
                    <label className="field-label">
                      <span className="label-text">SURFACE TEXTURE</span>
                      <span className="label-circuit"></span>
                    </label>
                    <div className="input-container">
                      <select
                        name="coat"
                        value={formData.coat}
                        onChange={handleSelectChange}
                        className="neural-select"
                      >
                        <option value="">► Select Surface Texture</option>
                        {availableCoats.map((coat) => (
                          <option key={coat} value={coat}>
                            {coat}
                          </option>
                        ))}
                      </select>
                      <div className="field-glow"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="matrix-divider">
              <span className="divider-text">BEHAVIORAL MATRIX</span>
              <div className="divider-pulse"></div>
            </div>

            {/* Behavioral Classification */}
            <div className="matrix-section" data-section="behavioral">
              <div className="section-header">
                <h3 className="section-title">
                  <span className="section-icon">⚡</span>
                  IDENTITY MATRIX
                </h3>
                <div className="section-line"></div>
              </div>

              {/* Gender Selection */}
              <div className="neural-field">
                <label className="field-label">
                  <span className="label-text">IDENTITY CLASSIFICATION</span>
                  <span className="label-circuit"></span>
                </label>
                <div className="neural-grid">
                  {["male", "female", "unknown"].map((option) => (
                    <label
                      key={option}
                      className={`neural-chip ${
                        formData.gender.includes(option) ? "activated" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="gender"
                        value={option}
                        checked={formData.gender.includes(option)}
                        onChange={(e) => handleMultiSelect(e, "gender")}
                        className="chip-input"
                      />
                      <span className="chip-label">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </span>
                      <div className="chip-pulse"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Selection */}
              <div className="neural-field">
                <label className="field-label">
                  <span className="label-text">TEMPORAL CLASSIFICATION</span>
                  <span className="label-circuit"></span>
                </label>
                <div className="neural-grid">
                  {["baby", "young", "adult", "senior"].map((option) => (
                    <label
                      key={option}
                      className={`neural-chip ${
                        formData.age.includes(option) ? "activated" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="age"
                        value={option}
                        checked={formData.age.includes(option)}
                        onChange={(e) => handleMultiSelect(e, "age")}
                        className="chip-input"
                      />
                      <span className="chip-label">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </span>
                      <div className="chip-pulse"></div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Parameters */}
            <div className="matrix-section" data-section="location">
              <div className="section-header">
                <h3 className="section-title">
                  <span className="section-icon">🌐</span>
                  GEOLOCATION PARAMETERS
                </h3>
                <div className="section-line"></div>
              </div>

              <div className="neural-field">
                <label className="field-label">
                  <span className="label-text">COORDINATE INPUT</span>
                  <span className="label-circuit"></span>
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="► Enter city, state, or coordinates"
                    className="neural-input"
                  />
                  <div className="field-glow"></div>
                  <div className="input-scanner"></div>
                </div>
              </div>

              {/* Distance Range */}
              {formData.location && (
                <div
                  className={`neural-field data-step ${
                    formData.location ? "active" : ""
                  }`}
                >
                  <label className="field-label">
                    <span className="label-text">SEARCH RADIUS</span>
                    <span className="label-circuit"></span>
                  </label>
                  <div className="range-container">
                    <input
                      type="range"
                      name="distance"
                      min="0"
                      max="500"
                      value={formData.distance || 0}
                      onChange={handleInputChange}
                      className="neural-range"
                    />
                    <div className="range-display">
                      <span className="range-value">
                        {formData.distance || 0}
                      </span>
                      <span className="range-unit">MILES</span>
                    </div>
                    <div className="range-track"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="matrix-divider">
              <span className="divider-text">COMPATIBILITY PROTOCOLS</span>
              <div className="divider-pulse"></div>
            </div>

            {/* Compatibility Matrix */}
            <div className="matrix-section" data-section="compatibility">
              <div className="section-header">
                <h3 className="section-title">
                  <span className="section-icon">🤝</span>
                  SOCIAL COMPATIBILITY
                </h3>
                <div className="section-line"></div>
              </div>

              <div className="neural-field">
                <label className="field-label">
                  <span className="label-text">SOCIAL PROTOCOLS</span>
                  <span className="label-circuit"></span>
                </label>
                <div className="neural-grid">
                  <label
                    className={`neural-chip ${
                      formData.goodWithChildren ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="goodWithChildren"
                      checked={formData.goodWithChildren}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Children</span>
                    <div className="chip-pulse"></div>
                  </label>

                  <label
                    className={`neural-chip ${
                      formData.goodWithDogs ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="goodWithDogs"
                      checked={formData.goodWithDogs}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Dogs</span>
                    <div className="chip-pulse"></div>
                  </label>

                  <label
                    className={`neural-chip ${
                      formData.goodWithCats ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="goodWithCats"
                      checked={formData.goodWithCats}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Cats</span>
                    <div className="chip-pulse"></div>
                  </label>
                </div>
              </div>

              {/* Medical Attributes */}
              <div className="neural-field">
                <label className="field-label">
                  <span className="label-text">MEDICAL STATUS</span>
                  <span className="label-circuit"></span>
                </label>
                <div className="neural-grid">
                  <label
                    className={`neural-chip ${
                      formData.spayedNeutered ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="spayedNeutered"
                      checked={formData.spayedNeutered}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Spayed/Neutered</span>
                    <div className="chip-pulse"></div>
                  </label>

                  <label
                    className={`neural-chip ${
                      formData.houseTrained ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="houseTrained"
                      checked={formData.houseTrained}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">House Trained</span>
                    <div className="chip-pulse"></div>
                  </label>

                  <label
                    className={`neural-chip ${
                      formData.specialNeeds ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="specialNeeds"
                      checked={formData.specialNeeds}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Special Needs</span>
                    <div className="chip-pulse"></div>
                  </label>

                  <label
                    className={`neural-chip ${
                      formData.shotsCurrent ? "activated" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="shotsCurrent"
                      checked={formData.shotsCurrent}
                      onChange={handleInputChange}
                      className="chip-input"
                    />
                    <span className="chip-label">Vaccinated</span>
                    <div className="chip-pulse"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Execute Scan Button */}
            <div className="scan-execution">
              <button
                type="submit"
                className="execute-btn"
                disabled={isLoading}
              >
                <div className="btn-content">
                  <span className="btn-icon">🔍</span>
                  <span className="btn-text">
                    {isLoading
                      ? "PROCESSING NEURAL SCAN..."
                      : "EXECUTE COMPANION SCAN"}
                  </span>
                  <span className="btn-arrow">›</span>
                </div>
                <div className="btn-glow"></div>
                <div className="btn-scanner"></div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
