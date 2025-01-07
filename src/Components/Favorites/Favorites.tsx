// eslint-disable @typescript-eslint/no-unused-vars
// import React, { useState } from "react";
import "./Favorites.css";
import { FavoritesProps } from "../../utils/Types";



export default function Favorites({ favoritePets }: FavoritesProps) {
  console.log("fav pets", favoritePets);
  return <div>Favorites</div>;
}
