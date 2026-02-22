import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { recipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
    
  const { data, setData } = useContext(recipeContext);
  const id = useParams().id;
  const recipe = data.find((recipe) => recipe.id === id);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const imageUrl = watch("image");

  // Single optimized useEffect for form initialization
  useEffect(() => {
    if (recipe) {
      const formData = {
        image: recipe.image,
        title: recipe.title,
        chef: recipe.chef,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
      };
      reset(formData);
      setPreview(recipe.image);
    }
  }, [recipe?.id]) // Only depend on recipe ID to avoid excessive resets

  // Separate useEffect for image preview updates
  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl])

  // Memoized submit handler to prevent unnecessary recreations
  const submitHandler = useCallback((formData) => {
    const recipeIndex = data.findIndex((r) => r.id === id);
    if (recipeIndex !== -1) {
      const updatedData = [...data];
      updatedData[recipeIndex] = {...updatedData[recipeIndex], ...formData };
      setData(updatedData);
      toast.success("✓ Recipe updated and saved to storage!");
    }
  }, [data, id, setData]);

  // Memoized delete handler to prevent unnecessary recreations
  const deleteHandler = useCallback(() => {
    const filteredData = data.filter((r) => r.id !== id);
    setData(filteredData);
    toast.success("✓ Recipe deleted and removed from storage!");
    navigate("/recipes");
  }, [data, id, setData, navigate])

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black py-8 px-4 md:px-8">
      {recipe ? (
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/recipes")}
            className="mb-6 flex items-center text-amber-400 hover:text-amber-300 transition font-medium"
          >
            ← Back to Recipes
          </button>

          {/* Main Container */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Left: Recipe Display */}
            <div className="md:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Recipe Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-80 object-cover"
                  />
                </div>

                {/* Recipe Info */}
                <div className="bg-linear-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700 shadow-lg">
                  <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Chef</p>
                      <p className="text-amber-400 font-semibold text-lg">{recipe.chef}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Category</p>
                      <p className="text-white capitalize font-medium">{recipe.category}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Description</p>
                      <p className="text-gray-300 leading-relaxed mt-1">{recipe.description}</p>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="bg-linear-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                    🥘 Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.split(",").map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{ingredient.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="bg-linear-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                    📝 Instructions
                  </h3>
                  <ol className="space-y-2">
                    {recipe.instructions.split(",").map((instruction, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-amber-500 font-bold min-w-max">{idx + 1}.</span>
                        <span>{instruction.trim()}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Right: Edit Form */}
            <div className="md:col-span-2">
              <div className="bg-linear-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  ✏️ Edit Recipe
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                  
                  {/* Image Preview & URL */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300">Image URL</label>
                    <input
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      {...register("image")}
                      type="url"
                      placeholder="Enter Image URL"
                    />
                    {preview && (
                      <div className="rounded-lg overflow-hidden border border-gray-600">
                        <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Title</label>
                    <input
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      {...register("title")}
                      type="text"
                      placeholder="Recipe Title"
                    />
                  </div>

                  {/* Chef */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Chef Name</label>
                    <input
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      {...register("chef")}
                      type="text"
                      placeholder="Chef Name"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Description</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                      {...register("description")}
                      placeholder="Recipe Description"
                      rows="2"
                    />
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Ingredients (comma-separated)</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                      {...register("ingredients")}
                      placeholder="e.g., salt, pepper, onion..."
                      rows="3"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Instructions (comma-separated)</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                      {...register("instructions")}
                      placeholder="e.g., Prepare ingredients, Cook slowly..."
                      rows="3"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">Category</label>
                    <select
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      {...register("category")}
                    >
                      <option value="">Select Category</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <button
                      type="submit"
                      className="bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
                    >
                      ✓ Update Recipe
                    </button>
                    <button
                      type="button"
                      onClick={deleteHandler}
                      className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
                    >
                      🗑️ Delete Recipe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg mb-6">Recipe not found.</p>
          <button
            onClick={() => navigate("/recipes")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Back to Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
