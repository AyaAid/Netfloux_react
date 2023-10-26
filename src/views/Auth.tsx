import React from "react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import AuthDetails from "../components/auth/AuthDetails";
import Navbar from "../components/navbar/Navbar";
function Auth() {
  return (
    <div>
      <SignIn />
      <SignUp />
      <AuthDetails />
      <Navbar />
    </div>
  );
}

export default Auth;
