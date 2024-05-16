import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Routes/Login/Login";
import Register from "./Routes/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoutes";
import UserViewContainer from "./Routes/UserView/UserViewContainer";
import AdminContainer from "./Routes/Admin/Admin";

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
          <UserViewContainer />
        </PrivateRoute>
      ),
    },
    {
      path:"/admin",
      element: (
        <PrivateRoute>
          <AdminContainer />
        </PrivateRoute>
      )
    }
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
