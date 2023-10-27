import React, { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import Navbar from "../navbar/Navbar";
import "./Profil.scss";
import ModifyEmail from "./ModifyEmail";
import ModifyPassword from "./ModifyPassword";
export default function Profil() {
    const [email, setEmail] = useState<string>("");
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const emailFromLocalStorage = localStorage.getItem("email");
            setEmail(emailFromLocalStorage || "");
        }
    }, [user]);


  return (
    <>
      <Navbar />
        <form>
          {user ? (
            <>
              <div className="formLogin-centre2">

                <div className="nav-profil2">
                </div>
                <p>Email : {email}</p>
                <ModifyEmail />
                <ModifyPassword />
              </div>
            </>
          ) : (
            <p>Veuillez vous connecter pour afficher l'email.</p>
          )}
        </form>
    </>
  );
}
