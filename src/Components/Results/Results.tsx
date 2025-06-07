import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import "./Results.css";
import SearchBar from "../SearchBar/SearchBar";
import { FilterCriteria, Animal } from "../../utils/Types";

const RESULTS_PER_PAGE = 25;

export default function Results() {
  const location = useLocation();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.animals) {
      const fetchedAnimals = location.state.animals;
      setAnimals(fetchedAnimals);
      setFilteredAnimals(fetchedAnimals);

      const tags = Array.from(
        new Set(fetchedAnimals.flatMap((animal: Animal) => animal.tags || []))
      ) as string[];
      setAvailableTags(tags);
      setIsLoading(false);
    }
  }, [location.state]);

  const handleSearch = (query: string) => {
    const filtered = animals.filter(
      (animal) =>
        animal.name.toLowerCase().includes(query.toLowerCase()) ||
        animal.breeds.primary.toLowerCase().includes(query.toLowerCase()) ||
        (animal.description &&
          animal.description.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredAnimals(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters: FilterCriteria) => {
    let filtered = [...animals];

    if (filters.age.length > 0) {
      filtered = filtered.filter((animal) => filters.age.includes(animal.age));
    }

    if (filters.size.length > 0) {
      filtered = filtered.filter((animal) =>
        filters.size.includes(animal.size)
      );
    }

    if (filters.gender.length > 0) {
      filtered = filtered.filter((animal) =>
        filters.gender.includes(animal.gender)
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((animal) =>
        animal.tags?.some((tag) => filters.tags.includes(tag))
      );
    }

    setFilteredAnimals(filtered);
    setCurrentPage(1);
  };

  const totalResults = filteredAnimals.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const currentResults = filteredAnimals.slice(
    startIndex,
    startIndex + RESULTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="results-container">
        <div className="results-content">
          <div className="results-loading">
            <p>Finding your perfect pets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="results-header">
          <h2>Search Results</h2>
          <p className="results-subtitle">
            Found {totalResults} adorable pets waiting for their forever homes
          </p>
        </div>

        <div className="filters-section">
          <SearchBar handleSearch={handleSearch} />
          <Filter
            onFilterChange={handleFilterChange}
            availableTags={availableTags}
          />
        </div>

        <div className="cards-container">
          {currentResults.length > 0 ? (
            currentResults.map((animal) => <Card key={animal.id} {...animal} />)
          ) : (
            <div className="no-results">
              <h3>No pets found</h3>
              <p>
                Try adjusting your filters or search terms to find more pets
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
