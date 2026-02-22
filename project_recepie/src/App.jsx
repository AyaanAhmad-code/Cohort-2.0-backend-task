import Navbar from "./components/Navbar";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return <div className="py-10 px-10  bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 font-thin w-full h-full">
      <Navbar />
      <MainRoutes />
    </div>
}

export default App;
