import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/connexion/Login";
import Register from "../views/connexion/Register";
import Home from "../views/Home";
import DetailFilm from "../views/detailFilm/DetailFilm";
import Calendar from "../views/calendar/Calendar";
import { useAuthState } from "../utils/firebase";
import Profil from "../components/Profil/Profil";

function AppRouter() {
  const user = useAuthState();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={user !== null ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/film/:filmId"
            element={user !== null ? <DetailFilm /> : <Navigate to="/" />}
          />
          <Route
            path="/calendar"
            element={user !== null ? <Calendar /> : <Navigate to="/" />}
          />
          <Route
            path="/profil"
            element={user !== null ? <Profil /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
