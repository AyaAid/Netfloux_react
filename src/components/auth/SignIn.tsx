import React, { useEffect, useState } from "react";
import { auth, provider } from "../../utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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
    <div>
      <form onSubmit={signIng}>
        <h1>Login to your account</h1>
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
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleClick}>Sign In with Google</button>
    </div>
  );
}
