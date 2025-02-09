/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import "./Results.css";

const RESULTS_PER_PAGE = 50; // Max results per page

export default function Results() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.animals) {
      setAnimals(location.state.animals);
      setFilteredAnimals(location.state.animals);
    }
  }, [location.state?.animals]);

  const handleFilterChange = (filters: {
    type: string;
    gender: string;
    age: string;
    tags: string;
  }) => {
    const filtered = animals.filter(
      (animal) =>
        (!filters.type || animal.type === filters.type) &&
        (!filters.gender ||
          animal.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (!filters.age ||
          animal.age.toLowerCase() === filters.age.toLowerCase()) &&
        (filters.tags === "any" ||
          (filters.tags === "none" && animal.tags.length === 0))
    );
    setFilteredAnimals(filtered);
    setCurrentPage(1); // Reset to first page after filtering
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
      <h2>Results ({totalResults})</h2>
      {/* <p>Total Results: {totalResults}</p> */}
      {/* <p>Showing {currentResults.length} results on this page</p> */}
      <Filter onFilterChange={handleFilterChange} />
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
