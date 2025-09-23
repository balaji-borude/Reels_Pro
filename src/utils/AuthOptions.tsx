import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PassThrough } from "stream";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions:NextAuthOptions={
    providers:[

        // 1. Providers // Github, // Google --> yanche inbuild providers pn apan use karu shaktooo 
        
        
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password". type:"password"},

            },
        //2. callbacks 
            async authorize(credentials) {
                
                // credintial Provider kadun credential bhetle jat aplyala 
                // tyala apan responsibe ahe pudhe tyache kay karayche ahe te 
                // callback bhetto 
                if(!credentials?.email ||!credentials?.password){
                   throw new Error("Missing email and password in options ") 
                };
                
                
                try {
                    // db connectioon kel 
                    await connectToDatabase();

                    // user la find kela User => model madhun 
                    const user = await User.findOne({email:credentials.email})

                    if(!user){
                        throw new Error("No user Found ");

                    }
                    // password compare kela  
                    const ismatched = await bcrypt.compare(credentials.password,user.password);

                    if(!ismatched){
                        throw new Error("Invalid Password");
                    }

                    return{
                        id:user._id.toString(),
                        emai:user.email,
                    }

                } catch (error) {
                    console.log("Erro occure in Login -->", error);
                }
            },
        }),
        
    ]
};