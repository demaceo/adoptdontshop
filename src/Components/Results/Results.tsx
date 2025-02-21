/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import "./Results.css";
import SearchBar from "../SearchBar/SearchBar";
import { FilterCriteria, Animal } from "../../utils/Types";
const RESULTS_PER_PAGE = 25; // Max results per page

export default function Results() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.animals) {
      setAnimals(location.state.animals);
      setFilteredAnimals(location.state.animals);
      // Extract unique tags from animals
      const tagsSet = new Set<string>();
      location.state.animals.forEach((animal: Animal) => {
        animal.tags.forEach((tag) => tagsSet.add(tag));
      });
      setAvailableTags(Array.from(tagsSet)); // Convert Set to Array
    }
  }, [location.state?.animals]);

  const handleFilterChange = (filters: FilterCriteria) => {
    const filtered = animals.filter(
      (animal) =>
        (!filters.type ||
          animal.type.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.gender ||
          animal.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (!filters.age ||
          animal.age.toLowerCase() === filters.age.toLowerCase()) &&
        (!filters.tags ||
          filters.tags === "" ||
          animal.tags.includes(filters.tags)) && // Ensure tag filtering works
        (filters.mixed === "" || animal.breeds.mixed === filters.mixed) // Fixed parentheses and added missing address for mixed
    );
    setFilteredAnimals(filtered);
    setCurrentPage(1);
  };

  // Search Logic
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const searched = animals.filter(
      (animal) =>
        animal.name?.toLowerCase().includes(lowerQuery) ||
        animal.type?.toLowerCase().includes(lowerQuery) ||
        animal.gender?.toLowerCase().includes(lowerQuery) ||
        animal.age?.toLowerCase().includes(lowerQuery) ||
        (animal.tags &&
          animal.tags.some((tag: string) =>
            tag.toLowerCase().includes(lowerQuery)
          ))
    );
    setFilteredAnimals(searched);
  };

  // Pagination Logic
  const totalResults = filteredAnimals.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const currentResults = filteredAnimals.slice(
    startIndex,
    startIndex + RESULTS_PER_PAGE
  );

  return (
    <div className="results-container">
      {/* <h2>Results ({totalResults})</h2> */}
      <h2>Results ({filteredAnimals.length})</h2>
      <SearchBar handleSearch={handleSearch} />
      {/* <p>Total Results: {totalResults}</p> */}
      {/* <p>Showing {currentResults.length} results on this page</p> */}
      <Filter
        onFilterChange={handleFilterChange}
        availableTags={availableTags}
      />
      <div className="cards-container">
        {currentResults.length > 0 ? (
          currentResults.map((animal) => <Card key={animal.id} {...animal} />)
        ) : (
          <p>No pets match your filter.</p>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
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
            Next
          </button>
        </div>
      )}
    </div>
  );
}
