import { useState } from "react";
import { auth } from "../../utils/firebase";
import { reauthenticateWithCredential, EmailAuthProvider , updatePassword } from "firebase/auth";





export default function Profil(){

    const user = auth.currentUser;
    const email = localStorage.getItem("email");
    console.log(email);
    return (
        <div>
          <form>
            <h1>Profil</h1>
            <button>Log In</button>
          </form>
        </div>
      );
}

