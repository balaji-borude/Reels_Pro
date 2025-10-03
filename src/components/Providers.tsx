
"use client";

import { SessionProvider } from "next-auth/react";
// import { NotificationProvider } from "./Notification";
import { ImageKitProvider } from "@imagekit/next";


const urlEndpoint = process.env.IMAGE_KIT_URL!;
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY!;

console.log("url endpoints --> ",urlEndpoint);
console.log(publicKey);

export default function Providers({ children }: { children: React.ReactNode }) {

  const authenticator = async () => {
    try {
                    // http://locahost:3000/api/imagekit-auth
      const res = await fetch("/api/imagekit-auth");
      if (!res.ok) throw new Error("Failed to authenticate");
      return res.json();
      
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw error;
    }
  };

  return (
    // session provider --> yala wrapper banavle karan --> upload user authetication aslyavrch karu shaknar na 

    <SessionProvider refetchInterval={5 * 60}>

      

        <ImageKitProvider
          publicKey={publicKey} 
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          {children}
        </ImageKitProvider>

      
    </SessionProvider>
  );
}