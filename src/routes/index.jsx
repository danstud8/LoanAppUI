import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';


const Routes = () => {
    const { token } = useAuth();
  
    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
        children: [
          {
            path: "/",
            element: <HomePage/>,
          },
        ],
      },
    ];
  
    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
      {
        path: "/signup",
        element: <SignUpPage/>,
      },
      {
        path: "/login",
        element: <SignInPage/>,
      },
    ];
  
    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
  
    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
  };
  
  export default Routes;