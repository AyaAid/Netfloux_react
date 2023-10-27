import React from "react";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";
import AuthDetails from "../components/sinIn/AuthDetails";
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
