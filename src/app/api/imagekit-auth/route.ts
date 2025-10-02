import { NextResponse } from "next/server";
import ImageKit from "imagekit";

console.log("Printing the Imagekit -->", process.env.IMAGE_KIT_URL);

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGE_KIT_URL!,
});

export async function GET(Request: unknown) {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();

    return NextResponse.json(authenticationParameters) &&  console.log("Image Kit Connection successfull");  
    // he  token , expire, signature --> he 3 return karte ImageKit sobat connectoion zalyave
    // basically it firt autheticates our parameter --> aplya public, private and endpoint la athorize karte ha function 
    // mhanje connection karte 

   
  } catch (error) {

    
    return NextResponse.json(
      { error: "Authentication failed" },
      {
        status: 500,
      }
    );
  }
}
