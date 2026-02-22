import React, { useContext, useMemo } from 'react'
import RecipeCard from '../components/RecipeCard'
import { recipeContext } from '../context/RecipeContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data, getFavoritedRecipes } = useContext(recipeContext)
  
  // Memoize featured recipes to prevent unnecessary re-renders
  const featured = useMemo(() => data.slice(0, 6), [data])

  // Memoize favorited recipes
  const favorites = useMemo(() => getFavoritedRecipes(), [getFavoritedRecipes])

  // Memoize category buttons to prevent re-creation
  const categories = useMemo(() => ['Breakfast','Dinner','Vegan','Dessert','Quick'], [])

  // Memoize things to do list
  const thingsToDo = useMemo(() => [
    { title: 'Meal Prep Like a Pro', desc: 'Batch cook staples to save time during the week.' },
    { title: 'Host a Theme Night', desc: 'Pick a cuisine and invite friends for a shared menu.' },
    { title: 'Pair With Drinks', desc: 'Simple wine or mocktail pairings for each dish.' },
    { title: 'Cook With Kids', desc: 'Easy, safe tasks to get little chefs involved.' }
  ], [])

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Abest Food Recipes</h1>
            <p className="text-gray-400 mt-2">Delicious ideas, dark-mode friendly — find your next favorite meal.</p>
          </div>

          <div className="w-full md:w-96">
            <label className="relative block">
              <span className="sr-only">Search recipes</span>
              <input
                className="w-full py-3 pl-4 pr-12 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Search recipes, ingredients, or cuisine..."
              />
              <svg className="w-5 h-5 absolute right-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </label>
          </div>
        </header>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Featured Recipes</h2>
          <p className="text-gray-400 mt-1">Handpicked dishes you should try tonight.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.id || recipe.title} recipe={recipe} />
            ))}
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">❤️ Your Favorites <span className="text-amber-400 text-lg">({favorites.length})</span></h2>
                <p className="text-gray-400 mt-1">Your saved favorite recipes.</p>
              </div>
              <Link 
                to="/favorites"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg transition"
              >
                View All →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.slice(0, 3).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pb-8">
          <h2 className="text-2xl font-semibold">Popular Categories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map(cat => (
              <button key={cat} className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-amber-500/90 hover:text-black transition">{cat}</button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Best Things To Do</h2>
          <p className="text-gray-400 mt-1">Practical ideas to make cooking fun and effortless.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {thingsToDo.map(item => (
              <div key={item.title} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-100">{item.title}</h3>
                <p className="text-xs text-gray-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-16 border-t border-gray-800 pt-6 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <div>
              <strong className="text-gray-100">Abest Food</strong>
              <div className="mt-1">Made with love — dark theme friendly.</div>
            </div>
            <div className="flex gap-4">
              <a className="hover:underline">About</a>
              <a className="hover:underline">Contact</a>
              <a className="hover:underline">Privacy</a>
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default Home
