import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import "./Results.css";
import SearchBar from "../SearchBar/SearchBar";
import { FilterCriteria, Animal } from "../../utils/Types";
import { LiveRegionAnnouncer, LIVE_MESSAGES } from "../../utils/accessibility";

const RESULTS_PER_PAGE = 25;

export default function Results() {
  const location = useLocation();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Accessibility: Initialize live region announcer
  const announcer = LiveRegionAnnouncer.getInstance();

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

      // Accessibility: Announce search completion
      announcer.announce(
        LIVE_MESSAGES.searchComplete(fetchedAnimals.length),
        "polite"
      );
    }
  }, [location.state, announcer]);

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

    // Accessibility: Announce search results
    announcer.announce(LIVE_MESSAGES.searchComplete(filtered.length), "polite");
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

    // Accessibility: Announce filter results
    announcer.announce(LIVE_MESSAGES.filterApplied(filtered.length), "polite");
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
          <div
            className="results-loading"
            role="status"
            aria-live="polite"
            aria-label="Loading search results"
          >
            <p>Finding your perfect pets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-content">
        <header className="results-header">
          <h1>Search Results</h1>
          <p className="results-subtitle" aria-live="polite" aria-atomic="true">
            Found {totalResults} adorable pets waiting for their forever homes
          </p>
        </header>

        <section
          className="filters-section"
          aria-label="Search and filter options"
        >
          <SearchBar handleSearch={handleSearch} />
          <Filter
            onFilterChange={handleFilterChange}
            availableTags={availableTags}
          />
        </section>

        <main
          className="cards-container"
          role="main"
          aria-label={`${currentResults.length} pets displayed`}
          aria-live="polite"
        >
          {currentResults.length > 0 ? (
            <>
              <div className="sr-only" aria-live="polite">
                Showing pets {startIndex + 1} to{" "}
                {Math.min(startIndex + RESULTS_PER_PAGE, totalResults)} of{" "}
                {totalResults}
              </div>
              {currentResults.map((animal) => (
                <Card key={animal.id} {...animal} />
              ))}
            </>
          ) : (
            <div className="no-results" role="status">
              <h3>No pets found</h3>
              <p>
                Try adjusting your filters or search terms to find more pets
              </p>
            </div>
          )}
        </main>

        {totalPages > 1 && (
          <nav
            className="pagination"
            role="navigation"
            aria-label="Search results pagination"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
              type="button"
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <span className="pagination-info" role="status" aria-live="polite">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
              type="button"
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
