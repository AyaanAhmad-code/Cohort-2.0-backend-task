import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useContext, useState, useCallback } from "react";
import { recipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate()
    const {data, setData} = useContext(recipeContext)
    const {register,handleSubmit,reset} = useForm()
    const [preview, setPreview] = useState("")

    // Memoized submit handler to prevent unnecessary recreations
    const submitHandler = useCallback((recipe) => {
      const newRecipe = {
        ...recipe,
        id: nanoid()
      };
      
      setData([...data, newRecipe]);
      toast.success("✓ Recipe created and saved to storage!");
      reset();
      setPreview("");
      navigate("/recipes");
    }, [data, setData, reset, navigate])

    // Memoized reset handler
    const resetHandler = useCallback(() => {
      reset();
      setPreview("");
    }, [reset])

  return (
    <div className="min-h-screen flex items-start justify-center py-12">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-3xl bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Create Recipe</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm text-gray-300">Image URL</label>
            <input
              className="block w-full mt-2 p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
              {...register("image")}
              type="url"
              placeholder="Enter Image URL"
              onChange={(e) => setPreview(e.target.value)}
            />
            {preview ? (
              <img src={preview} alt="preview" className="mt-3 w-full h-40 object-cover rounded-md" />
            ) : (
              <div className="mt-3 w-full h-40 bg-gray-800 rounded-md flex items-center justify-center text-gray-500">Image preview</div>
            )}
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="flex gap-3">
              <input className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("title")} type="text" placeholder='Recipe Title'/>
              <input className="w-44 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("chef")} type="text" placeholder='Chef Name'/>
            </div>

            <textarea className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("description")} placeholder='Recipe Description'/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <textarea className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("ingredients")} placeholder='write ingredients separated by comma'/>
              <textarea className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("instructions")} placeholder='write instructions separated by comma'/>
            </div>

            <div className="flex items-center justify-between">
              <select className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100" {...register("category")}>
                <option value="">Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>

              <div className="flex gap-3">
                <button type="submit" className="bg-amber-500 text-black px-4 py-2 rounded-lg font-medium">Create Recipe</button>
                <button type="button" onClick={resetHandler} className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-gray-200">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create
