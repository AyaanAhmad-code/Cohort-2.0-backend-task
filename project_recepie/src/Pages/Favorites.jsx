import { useContext, useMemo } from 'react';
import { recipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { getFavoritedRecipes } = useContext(recipeContext);

  // Memoize favorited recipes
  const favoritedRecipes = useMemo(() => getFavoritedRecipes(), [getFavoritedRecipes]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white">❤️ My Favorites</h1>
            <span className="bg-amber-500 text-black px-4 py-2 rounded-full font-bold text-lg">
              {favoritedRecipes.length}
            </span>
          </div>
          <p className="text-gray-400 text-lg">Your collection of favorite recipes</p>
        </div>

        {/* Recipes Grid */}
        {favoritedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
            <p className="text-gray-400 mb-8">
              Start adding recipes to your favorites by clicking the heart icon on recipe cards!
            </p>
            <Link
              to="/recipes"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
