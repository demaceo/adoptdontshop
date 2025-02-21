import { useState, useEffect } from "react";
import "./Favorites.css";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import { Animal, FilterCriteria } from "../../utils/Types";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Animal[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Animal[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);


  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
    setFilteredFavorites(storedFavorites);
    // Extract unique tags from favorites
    const tagsSet = new Set<string>();
    storedFavorites.forEach((animal: Animal) => {
      animal.tags.forEach((tag) => tagsSet.add(tag));
    });
    setAvailableTags(Array.from(tagsSet)); // Convert Set to Array
  }, []);

  const handleFilterChange = (filters: FilterCriteria) => {
    const filtered = favorites.filter(
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
        (filters.mixed === "" || animal.breeds.mixed === filters.mixed)
    );
    setFilteredFavorites(filtered);
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const searched = favorites.filter(
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
      <Filter
        onFilterChange={handleFilterChange}
        availableTags={availableTags}
      />
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
