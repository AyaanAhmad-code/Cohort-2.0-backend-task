import { NavLink } from "react-router-dom";
import { useContext, useMemo } from "react";
import { recipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const { favorites } = useContext(recipeContext);
  
  // Memoize favorites count
  const favoriteCount = useMemo(() => favorites.length, [favorites])

  return (
    <div className="flex justify-center gap-x-10 text-sm mb-10 items-center flex-wrap">
      <NavLink 
        className={(e) => e.isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-white transition"} 
        to="/"
      >
        Home
      </NavLink>
      <NavLink 
        className={(e) => e.isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-white transition"} 
        to="/recipes"
      >
        Recipes
      </NavLink>
      <NavLink 
        className={(e) => e.isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-white transition"} 
        to="/favorites"
      >
        <span className="flex items-center gap-2">
          ❤️ Favorites
          {favoriteCount > 0 && (
            <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              {favoriteCount}
            </span>
          )}
        </span>
      </NavLink>
      <NavLink 
        className={(e) => e.isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-white transition"} 
        to="/about"
      >
        About
      </NavLink>
      <NavLink 
        className={(e) => e.isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-white transition"} 
        to="/create"
      >
        Create
      </NavLink>
    </div>
  )
}

export default Navbar
