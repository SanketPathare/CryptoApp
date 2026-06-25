import { useState, useEffect } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("crypto-favorites") || "[]");
  } catch {
    return [];
  }
};

const FavoritesButton = ({ coinId, coinName }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(getFavorites().includes(coinId));
  }, [coinId]);

  const toggle = () => {
    const favs = getFavorites();
    let updated;
    if (favs.includes(coinId)) {
      updated = favs.filter((id) => id !== coinId);
    } else {
      updated = [...favs, coinId];
    }
    localStorage.setItem("crypto-favorites", JSON.stringify(updated));
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}
      className="p-1.5 rounded-lg hover:bg-glass-hover transition-colors cursor-pointer"
      aria-label={isFav ? `Remove ${coinName} from favorites` : `Add ${coinName} to favorites`}
    >
      {isFav ? (
        <HiHeart className="w-4 h-4 text-signal-red" />
      ) : (
        <HiOutlineHeart className="w-4 h-4 text-text-secondary hover:text-text-primary" />
      )}
    </button>
  );
};

export default FavoritesButton;
