import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "../views/Auth";
import Home from "../views/Home";


function AppRouter() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;