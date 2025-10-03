"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

// getting val;ue

const Header = () => {
  // sarv data bhetto aplyala sessionmadhun
  const { data } = useSession();

  // how to signout user
  const handleSignOut = async () => {
    try {
      await signOut();
      // userSignOut succesfully toast display kr
      alert("signout")
      // redirect user to the Login screen
    } catch (error) {
      // display toast not signOut
    }
  };

  return (
    <div>
      <button onClick={() => handleSignOut}>SignOut</button>

      {sessionStorage ? (
        <div> Welcome </div>
      ) : (
        <div>
          <Link href="/login"> Login</Link>
          <Link href="/register"> SignUp</Link>{" "}
        </div>
      )}
      
    </div>
  );
};

export default Header;
