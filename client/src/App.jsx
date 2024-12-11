import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTER } from "./router.config";
import MainPage from "./pages/MainPage/MainPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ApplicationsPage from "./pages/ApplicationsPage/ApplicationsPage";
import { ThemeProvider } from "./HOCs/ThemeContext";
import "./App.css";
import { ApplicationProvider } from "./HOCs/ApplicationsContext";
import ThemeToggleButton from "./ui/ThemeToggleButton/ThemeToggleButton";
import SignInPage from "./pages/SignInPage/SignInPage";
import EditApplicationPage from "./pages/EditApplicationPage/EditApplicationPage";
import ProtectedRoute from "./HOCs/ProtectedRoute";
import { useEffect, useState } from "react";
import { SearchTypeProvider } from "./HOCs/SearchTypeProvider";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.setItem("user", false);
      setUser(false);
    }
  }, []);

  const routes = [
    { path: ROUTER.main, element: <MainPage /> },
    {
      path: ROUTER.success,
      element: <SuccessPage />,
    },
    {
      path: ROUTER.signIn,
      element: (
        <ProtectedRoute isAllowed={!user} redirectPath={ROUTER.applications}>
          <SignInPage setUser={setUser} />
        </ProtectedRoute>
      ),
    },
    {
      path: `${ROUTER.application}/:id`,
      element: (
        <ProtectedRoute isAllowed={!!user}>
          <SearchTypeProvider>
            <ApplicationProvider>
              <EditApplicationPage />
            </ApplicationProvider>
          </SearchTypeProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTER.applications,
      element: (
        <ProtectedRoute isAllowed={!!user}>
          <SearchTypeProvider>
            <ApplicationProvider>
              <ApplicationsPage />
            </ApplicationProvider>
          </SearchTypeProvider>
        </ProtectedRoute>
      ),
    },
  ];

  const router = createBrowserRouter(routes);
  return (
    <ThemeProvider>
      <ThemeToggleButton />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
