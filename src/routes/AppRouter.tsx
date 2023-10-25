import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "../views/Auth";

function AppRouter() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;