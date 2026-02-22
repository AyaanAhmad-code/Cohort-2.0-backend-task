import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom';
import { recipeContext } from '../context/RecipeContext';

const RecipeCard = memo(({ recipe }) => {
  const { id, image, title, chef, description } = recipe;
  const { toggleFavorite, isFavorited } = useContext(recipeContext);
  const isFav = isFavorited(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <Link to={`/recipe/detail/${id}`} className="block transform duration-150 hover:scale-105">
      <div className="bg-linear-to-br from-gray-800/60 to-gray-900/60 rounded-2xl overflow-hidden shadow-lg border border-gray-700 relative group">
        <div className="relative h-52 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-2xl p-2 rounded-full transition transform hover:scale-110 z-10 backdrop-blur-sm"
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? '❤️' : '🤍'}
          </button>

          {/* Recipe Title & Chef */}
          <div className="absolute left-4 bottom-4">
            <h3 className="text-lg font-bold text-white drop-shadow">{title}</h3>
            <p className="text-xs text-gray-300 mt-1">By {chef}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">Read details</span>
            <span className="text-xs text-gray-400">•</span>
          </div>
        </div>
      </div>
    </Link>
  )
})

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard
