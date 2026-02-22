import { useContext } from "react";
import Navbar from "./components/Navbar";
import MainRoutes from "./routes/MainRoutes";
import StorageSettings from "./components/StorageSettings";
import { recipeContext } from "./context/RecipeContext";

function App() {
  const { data, setData } = useContext(recipeContext);

  return (
    <div className="py-10 px-10 bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-100 font-thin w-full h-full">
      <Navbar />
      <MainRoutes />
      <StorageSettings data={data} setData={setData} />
    </div>
  )
}

export default App;
