import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/connexion/Login";
import Register from "../views/connexion/Register";
import Home from "../views/Home";
import DetailFilm from "../views/detailFilm/DetailFilm";
import Calendar from "../views/calendar/Calendar";
import { useAuthState } from "../utils/firebase";

function AppRouter() {
  const user = useAuthState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoading ? null : <Login />} />
          <Route path="/register" element={isLoading ? null : <Register />} />
          <Route
            path="/home"
            element={
              isLoading ? null : user !== null ? <Home /> : <Navigate to="/" />
            }
          />
          <Route
            path="/film/:filmId"
            element={
              isLoading ? null : user !== null ? (
                <DetailFilm />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/calendar"
            element={
              isLoading ? null : user !== null ? (
                <Calendar />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
