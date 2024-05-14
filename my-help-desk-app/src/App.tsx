import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Routes/LoginRegister/Login";
import Register from "./Routes/LoginRegister/Register";
import UserView from "./Routes/UserView/UserView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/create",
      element: (
        <PrivateRoute>
          <UserView />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
