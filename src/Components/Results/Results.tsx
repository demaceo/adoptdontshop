import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import { AnimalCard } from "../../utils/Types";
import "./Results.css";
export default function Results() {
  const [animals, setAnimals] = useState<AnimalCard[]>([]); // Store the animals
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();

  useEffect(() => {
    const getAnimals = async () => {
      setLoading(true);
      setAnimals(location.state.animals);
      setTotalPages(location.state.pagination.total_pages);
      setLoading(false);
    };
    getAnimals();
  }, [location.state.animals, location.state.pagination]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!animals || animals.length === 0) {
    return <h2>No animals found for your search criteria.</h2>;
  } else if (!animals.length) {
    return (
      <h2>
        <br />
        One moment while we play fetch...
        <br />
      </h2>
    );
  }

  return (
    <div className="results-container">
      <h2>Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="cards-container">
            {animals.map((animal: AnimalCard) => (
              <Card key={animal.id} {...animal} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
