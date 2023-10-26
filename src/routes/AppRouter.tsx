import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "../views/Auth";
import Home from "../views/Home";
import DetailFilm from "../views/detailFilm/DetailFilm";
import Calendar from "../views/calendar/Calendar";



function AppRouter() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/film/:filmId" element={<DetailFilm />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
