import { router } from "./app.routes"
import { RouterProvider } from "react-router";
import "./features/style/global.scss"
import { AuthProvider } from "./features/auth/auth.context";

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
