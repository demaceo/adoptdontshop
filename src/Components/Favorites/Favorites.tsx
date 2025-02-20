/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import "./Favorites.css";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
    setFilteredFavorites(storedFavorites);
  }, []);


const handleFilterChange = (filters: {
  type: string;
  gender: string;
  age: string;
  tags: string;
}) => {
  const filtered = favorites.filter(
    (animal) =>
      (!filters.type ||
        animal.type.toLowerCase() === filters.type.toLowerCase()) &&
      (!filters.gender ||
        animal.gender.toLowerCase() === filters.gender.toLowerCase()) &&
      (!filters.age ||
        animal.age.toLowerCase() === filters.age.toLowerCase()) &&
      (!filters.tags || (filters.tags === "none" && animal.tags.length === 0))
  );
  setFilteredFavorites(filtered);
};

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const searched = favorites.filter(
      (animal) =>
        animal.name.toLowerCase().includes(lowerQuery) ||
        animal.type.toLowerCase().includes(lowerQuery) ||
        animal.gender.toLowerCase().includes(lowerQuery) ||
        animal.age.toLowerCase().includes(lowerQuery) ||
        (animal.tags &&
          animal.tags.some((tag: string) =>
            tag.toLowerCase().includes(lowerQuery)
          ))
    );
    setFilteredFavorites(searched);
  };

  // const handleResetFilters = () => {
  //   setFilteredFavorites(favorites);
  // };

  return (
    <section className="favorites">
      <h2>Your Favorite Pets</h2>
      <SearchBar handleSearch={handleSearch} />
      {/* <button onClick={handleResetFilters}>Reset Filters</button> */}

      <Filter onFilterChange={handleFilterChange} />
      <div className="favorites-grid">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((animal) => (
            <Card key={animal.id} {...animal} />
          ))
        ) : (
          <p>No favorited pets match your filter.</p>
        )}
      </div>
    </section>
  );
}
