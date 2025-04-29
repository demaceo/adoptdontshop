/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(stored);
    setFiltered(stored);
    // derive unique tags
    const allTags = new Set<string>();
    stored.forEach((pet: { tags: any[]; }) => pet.tags.forEach((t: string) => allTags.add(t)));
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
    <section className="favorites">
      <h2>Your Favorite Pets</h2>
      <div className="filters-container">
        <div className="search-bar">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <Filter onFilterChange={handleFilter} availableTags={tags} />
      </div>
      {filtered.length > 0 ? (
        <div className="favorites-grid">
          {filtered.map((pet) => (
            <Card key={pet.id} {...pet} />
          ))}
        </div>
      ) : (
        <p className="no-favorites">
          No favorites match your search or filters.
        </p>
      )}
    </section>
  );
}
