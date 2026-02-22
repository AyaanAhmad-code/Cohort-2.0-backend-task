import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Recipes from "../Pages/Recipes";
import About from "../Pages/About";
import Create from "../Pages/Create";
import SingleRecipe from "../Pages/SingleRecipe";
import Favorites from "../Pages/Favorites";


const MainRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/recipes" element={<Recipes />}/>
    <Route path="/favorites" element={<Favorites />}/>
    <Route path="/recipe/detail/:id" element={<SingleRecipe />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/create" element={<Create />}/>
  </Routes>
}

export default MainRoutes
