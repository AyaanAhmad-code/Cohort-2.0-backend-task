import { useContext } from 'react';
import { recipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const {data} = useContext(recipeContext)

  const renderRecipes = data.map((recipe) => 
    <RecipeCard key={recipe.id} recipe={recipe} />
  )
  return (
    <div className='h-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6'>
      {data.length > 0 ? renderRecipes : <p className="text-center text-gray-500 mt-10">No recipes found. Please add some recipes.</p>}
    </div>
  )
}

export default Recipes
