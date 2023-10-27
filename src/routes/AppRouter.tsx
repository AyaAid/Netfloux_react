import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "../views/connexion/Login";
import Register from "../views/connexion/Register";
import Home from "../views/Home";
import DetailFilm from "../views/detailFilm/DetailFilm";
import Calendar from "../views/calendar/Calendar";
import {useAuthState} from "../utils/firebase";
import Profil from "../components/Profil/Profil";
import Followed from "../views/followed/followed";

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
                    <Route path="/" element={isLoading ? null : <Login/>}/>
                    <Route path="/register" element={isLoading ? null : <Register/>}/>
                    <Route
                        path="/home"
                        element={
                            isLoading ? null : user !== null ? <Home/> : <Navigate to="/"/>
                        }
                    />
                    <Route
                        path="/film/:filmId"
                        element={
                            isLoading ? null : user !== null ? (
                                <DetailFilm/>
                            ) : (
                                <Navigate to="/"/>
                            )
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            isLoading ? null : user !== null ? (
                                <Calendar/>
                            ) : (
                                <Navigate to="/"/>
                            )
                        }
                    />
                    <Route
                        path="/followed"
                        element={
                            isLoading ? null : user !== null ? (
                                <Followed/>
                            ) : (
                                <Navigate to="/"/>
                            )
                        }
                    />
                    <Route
                        path="/profil"
                        element={
                            isLoading ? null : user !== null ? (
                                <Profil/>
                            ) : (
                                <Navigate to="/"/>
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;
