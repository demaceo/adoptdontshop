/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./FavoriteButton.css";
import { FavoriteButtonProps } from "../../utils/Types";

export default function FavoriteButton({ id, petData }: FavoriteButtonProps) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const isFavorited = useCallback(
    (id: number) => favorites.some((favorite: any) => favorite.id === id),
    [favorites]
  );

  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(
    isFavorited(id)
  );

  useEffect(() => {
    setIsFavoritedState(isFavorited(id));
  }, [id, isFavorited]);

  const animateAddFavorite = () => {
    const tl = gsap.timeline();
    gsap.set(`.${"--" + id}`, {
      //start animation state
      transition: "ease 0",
      transform: "rotate(0deg)",
    });

    tl.to(`.${"--" + id}`, { duration: 0.1, translateY: 3 })
      .to(`.${"--" + id}`, { duration: 0.3, rotateY: 360, translateY: -10 })
      .to(`.${"--" + id}`, { duration: 0.3, translateY: 0 })
      .to(
        `.${"--" + id}`,
        { duration: 0.2, filter: "grayscale(0%)", cursor: "default" },
        "-=.4"
      )
      .to(
        `.pet-name-${id}`,
        {
          duration: "0.2 !important",
          backgroundColor: "rgb(253,235,103)",
          borderRadius: "5px",
          color: "rgb(253, 135, 103)",
        },
        "-=.4"
      )
      .to(
        `.badge-${id}`,
        {
          borderColor: "rgb(253,235,103)",
          borderRadius: "5px",
          backgroundColor: "rgb(253,235,103)",
          color: "rgb(40,44,52)",
        },
        "<"
      )
      .to(`.card-${id}`, { border: "solid 3px rgb(253,235,103)" }, "<")
      .to(`.${"--" + id}`, {
        ease: "none",
        duration: 8,
        repeat: -1,
        rotate: 360,
      });
  };

  const handleFavorite = () => {
    let updatedFavorites;
    if (isFavoritedState) {
      // Remove from favorites
      updatedFavorites = favorites.filter(
        (favorite: any) => favorite.id !== id
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, petData];
      animateAddFavorite();
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavoritedState(!isFavoritedState);
  };

  return (
    <button
      className={`favorite-btn --${id} ${isFavoritedState ? "favorited" : ""}`}
      onClick={handleFavorite}
      aria-label={
        isFavoritedState ? "Remove from favorites" : "Add to favorites"
      }
    >
      {isFavoritedState ? "★" : "☆"}
    </button>
  );
}
