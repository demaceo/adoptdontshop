import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import { Animal, FilterCriteria } from "../../utils/Types";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Animal[]>([]);
  const [filtered, setFiltered] = useState<Animal[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
    setFiltered(stored);
    // derive unique tags
    const allTags = new Set<string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stored.forEach((pet: { tags: any[] }) =>
      pet.tags.forEach((t: string) => allTags.add(t))
    );
    setTags(Array.from(allTags));
  }, []);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    setFiltered(
      favorites.filter(
        (pet) =>
          pet.name.toLowerCase().includes(q) ||
          pet.type.toLowerCase().includes(q) ||
          pet.tags.some((t) => t.toLowerCase().includes(q))
      )
    );
  };

  const handleFilter = (criteria: FilterCriteria) => {
    setFiltered(
      favorites.filter(
        (pet) =>
          (!criteria.type || pet.type === criteria.type) &&
          (!criteria.gender || pet.gender === criteria.gender) &&
          (!criteria.age || pet.age === criteria.age) &&
          (!criteria.tags || pet.tags.includes(criteria.tags)) &&
          (criteria.mixed === "" || pet.breeds.mixed === criteria.mixed)
      )
    );
  };

  return (
    <div className="favorites">
      <div className="favorites-content">
        <div className="favorites-header">
          <h2>Your Favorite Pets</h2>
          <p className="favorites-subtitle">
            Your collection of adorable companions waiting for a forever home
          </p>

          {favorites.length > 0 && (
            <div className="favorites-stats">
              <div className="favorites-stat">
                <span className="favorites-stat-number">
                  {favorites.length}
                </span>
                <span className="favorites-stat-label">Saved Pets</span>
              </div>
              <div className="favorites-stat">
                <span className="favorites-stat-number">{filtered.length}</span>
                <span className="favorites-stat-label">Showing</span>
              </div>
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="filters-container">
            <div className="search-bar">
              <SearchBar handleSearch={handleSearch} />
            </div>
            <Filter onFilterChange={handleFilter} availableTags={tags} />
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="favorites-grid">
            {filtered.map((pet) => (
              <Card
                key={pet.id}
                {...pet}
                image_url={pet.image_url}
                images={pet.images}
              />
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <h3>
              {favorites.length === 0
                ? "No Favorites Yet"
                : "No pets match your filters"}
            </h3>
            <p>
              {favorites.length === 0
                ? "Start exploring and save your favorite pets to see them here!"
                : "Try adjusting your search or filters to find your saved pets."}
            </p>
            {favorites.length === 0 && (
              <Link to="/" className="cta-button">
                Discover Pets
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
