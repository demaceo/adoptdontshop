/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import "./Favorites.css";
// import { FavoritesProps } from "../../utils/Types";
import Card from "../Card/Card";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  setFavorites(storedFavorites);
}, []);


  return (
    <section className="favorites">
      <h2>Your Favorite Pets</h2>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorites found.</p>
        ) : (
          favorites.map((animal: any) => (
            <Card key={animal.id} {...animal} />
          ))
        )}
      </div>
    </section>
  );
}
