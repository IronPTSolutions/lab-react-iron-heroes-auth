import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/ui";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  HeroesPage,
  HeroDetailPage,
} from "./pages";

function PrivateRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/heroes"
          element={
            <PrivateRoute>
              <HeroesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/heroes/:id"
          element={
            <PrivateRoute>
              <HeroDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
