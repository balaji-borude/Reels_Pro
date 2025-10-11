"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

// getting val;ue

const Header = () => {
  // sarv data bhetto aplyala sessionmadhun
   const { data } = useSession();
  //const data=1;
  // how to signout user
  const handleSignOut = async () => {
    try {
      await signOut();
      // userSignOut succesfully toast display kr
      alert(" user signout Succesfully");
      // redirect user to the Login screen
    } catch (error) {
      // display toast not signOut
      alert("Issue in logout ");
    }
  };

  return (
    <div className="">
      <nav>
        <div className="w-full h-auto flex justify-between px-3 py-3 bg-red-400">
          {/* logo of Reels Proo */}
          <h2 className="text-2xl "> Reels Pro</h2>

          <div>
            {data ? (
              <div> 
                  {/* profile icon and logout button  */}
                  <button onClick={handleSignOut}
                    className="border px-3 py-1 rounded-lg text-xl font-bold hover:cursor-pointer  "
                  >
                    SignOut
                  </button>
              </div>
            ) : (
              <div className="flex space-x-7">
 

                <Link href="/login"
                 className="border px-4 py-1 rounded-lg text-xl font-bold hover:cursor-pointer  "
                > 
                  Login
                </Link>
           
                <Link href="/register"
                  className="border px-3 py-1 rounded-lg text-xl font-bold hover:cursor-pointer  "
                > 
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* <p className="text-3xl bg-amber-400 "> Header section </p> */}

        {/*  */}
        {/* <p className="bg-green-400 w-10"> {data?.user}</p> */}
      </nav>
    </div>
  );
};

export default Header;
