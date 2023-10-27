import React, { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import "../signIn/SignIn.scss";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [users, setUsers] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("user", JSON.stringify(users));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    if (currentUser) {
      setUsers(currentUser);
      navigate("/home");
    }
  }, [navigate]);
  return (
    <div className="formRegister">
      <div className="formLogin-centre">
        <form className="formulaire" onSubmit={signUp}>
          <h2>S'inscrire</h2>
          <input
            className="input"
            type="email"
            placeholder="Entre ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Entre ton mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="submit">
            Log In
          </button>
        </form>

        <p>
          Vous avez déjà un compte ?{" "}
          <span className="link-register" onClick={redirectToLogin}>
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
/*<form onSubmit={signUp}>
        <h1>S'enregistrer</h1>
        <input
          type="email"
          placeholder="Entre ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entre ton mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form> */
