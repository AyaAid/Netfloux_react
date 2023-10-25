import React from "react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import AuthDetails from "../components/auth/AuthDetails";


function Auth() {

  return (
    <div>
        <SignIn/>
        <SignUp/>
        <AuthDetails/>
    </div>
  );
}

export default Auth;
