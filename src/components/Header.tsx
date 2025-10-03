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
      alert(" user signout Succesfully")
      // redirect user to the Login screen
    } catch (error) {
      // display toast not signOut
      alert("Issue in logout ")
    }
  };

  return (
    <div className="">
      
      <nav>
        {/* logo of Reels Proo */}

        <p className="text-3xl bg-amber-400 "> Header section </p>


        <button onClick={handleSignOut}>SignOut</button>
        {/* <p className="bg-green-400 w-10"> {data?.user}</p> */}
        {data ? (
          <div> Welcome </div>
        ) : (
          <div>
            <Link href="/login"> Login</Link>
            <Link href="/register"> SignUp</Link>{" "}
          </div>
        )}
      </nav>
      
      
    </div>
  );
};

export default Header;
