/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import "./Favorites.css";
// import { FavoritesProps } from "../../utils/Types";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";

export default function Favorites(){
  const [favorites, setFavorites] = useState<any[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
    setFilteredFavorites(storedFavorites); // Initialize filtered state
  }, []);

  const handleFilterChange = (filters: {
    type: string;
    gender: string;
    age: string;
    tags: string;
  }) => {
    const filtered = favorites.filter(
      (animal) =>
        (!filters.type || animal.type === filters.type) &&
        (!filters.gender ||
          animal.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (!filters.age ||
          animal.age.toLowerCase() === filters.age.toLowerCase()) &&
        (filters.tags === "any" ||
          (filters.tags === "none" && animal.tags.length === 0))
    );
    setFilteredFavorites(filtered);
  };

  return (
    <section className="favorites">
      <h2>Your Favorite Pets</h2>
      <Filter onFilterChange={handleFilterChange} />
      <div className="favorites-grid">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((animal) => (
            <Card key={animal.id} {...animal} />
          ))
        ) : (
          <p>No pets match your filter.</p>
        )}
      </div>
      {/* <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorites found.</p>
        ) : (
          favorites.map((animal: any) => <Card key={animal.id} {...animal} />)
        )}
      </div> */}
    </section>
  );
}
