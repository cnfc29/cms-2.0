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

const routes = [
  { path: ROUTER.main, element: <MainPage /> },
  { path: ROUTER.success, element: <SuccessPage /> },
  { path: ROUTER.signIn, element: <SignInPage /> },
  {
    path: `${ROUTER.application}/:id`,
    element: (
      <ApplicationProvider>
        <EditApplicationPage />
      </ApplicationProvider>
    ),
  },
  {
    path: ROUTER.applications,
    element: (
      <ApplicationProvider>
        <ApplicationsPage />
      </ApplicationProvider>
    ),
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider>
      <ThemeToggleButton />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
