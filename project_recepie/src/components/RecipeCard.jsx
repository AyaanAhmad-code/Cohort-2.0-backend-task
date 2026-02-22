import React from 'react'
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const { id, image, title, chef, description } = recipe;

  return (
    <Link to={`/recipe/detail/${id}`} className="block transform duration-150 hover:scale-105">
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <div className="relative h-52 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
}

export default RecipeCard
