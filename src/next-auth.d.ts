import { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface Session{
        // session mahe kay pahije --> te aplyala decide karayche ani add karayche 
         user:{
            id:string;
         }&DefaultSession["user"];
         
    }
}