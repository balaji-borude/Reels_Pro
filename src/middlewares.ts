import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";



// export { default } from "next-auth/middleware";

export default withAuth(

    // middleware function 
    function middleware(){
        return NextResponse.next();
    },
    {
        callbacks:{
            authorized:({token,req})=>{
                const {pathname} = req.nextUrl;

                // allow auth related routes
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname ==="/login" ||
                    pathname === "/register"
                ){
                    return true;
                    // ya path la middleware check nahi krnar 
                }

                // public path --> warchya pn public path ahe 
                // apan wr pn lihu shakt hot0
                // sarv jn visit karu shakto tymul ="/" / path dili 

                if(pathname === "/" ||
                    pathname.startsWith("/api/videos")
                ){
                    return true;
                }

                return !!token
            }
        }
    }
    
)



// config madhe jithe - jithe middleware run honar ahe tyanchi --> path dyavi lagte 
export const config={
    // negative lookahead regex: "/((?!login).*)"
    matcher: ["/((?!api/auth|login|register|$).*)"],
}   