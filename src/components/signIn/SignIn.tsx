import React, { useEffect, useState } from "react";
import { auth, provider } from "../../utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignIn.scss";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [value, setValue] = useState<string | null>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIng = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>  {
        console.log(userCredential)
    }).catch((error)=>{
        console.log(error)
    })
  };

  const navigate = useNavigate();

  const redirectToRegister = () => {
    navigate('/register')
}

  const handleClick=()=>{
    signInWithPopup(auth, provider).then((data)=>{
      const userEmail = data.user.email;
      setValue(userEmail);
      localStorage.setItem("email", userEmail || "")
    })
  }

   useEffect(() => {
     const storedEmail = localStorage.getItem("email");
     if (storedEmail !== null) {
       setValue(storedEmail);
     }
   }, []);

  return (
    <div className="formLogin">
      <div className="formLogin-centre">
      <form className="formulaire" onSubmit={signIng}>
        <h2>Connexion</h2>
        <input
        className="input"
          type="email"
          placeholder="Entre ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Entre ton mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="google-div"  onClick={handleClick}>
        <p><a className="google">Sign In with Google</a></p>
        <div className="google-logo"></div>
        </div>
      
        <button type="submit" className="submit">Log In</button>
      </form>
      
      <p>Vous n'avez pas de compte ? <span className="link-register" onClick={redirectToRegister}>S'enregistrer</span></p>
      </div>
      
    </div>
  );
}
