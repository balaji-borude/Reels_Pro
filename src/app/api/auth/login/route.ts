
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// import { SignCallback } from "jsonwebtoken";



// login data sathi type 
interface loginReq{
    email:string,
    password:string,
 
}

interface Ipayload{
    id:string,
    email:string
}

export async function POST(req:NextRequest){

    try {
        // get credential 
        const{email,password}:loginReq = await req.json();

        // validation 
        if(!email || !password){
            return NextResponse.json(
                {message:" All Fields are required!!"},
                {status:400}
            )
        };

        // check useris exist or not 
        const user = await User.findOne({email});

        // if not 
        if(!user){
           return NextResponse.json(
                {message:"User is not Found"},
                { status: 404 } // 404 not found 
            )
        };

        // match the password to db. passs
        const matchedPass= await bcrypt.compare(password,user.password);
        if(!matchedPass){
            return NextResponse.json(
                {message:"Please Enter a Valid password"},
                {status:401}
            )
        };


     // TODO: generate JWT or session
        // create the token using sign 
        const payload : Ipayload={
            email:email,
            id:user._id.toString(),

        };

        // const options={
        //     expiresIn:"21d"
        // }

        // jwt secret -->
        const JWT_SECRET = process.env.JWT_SECRET as  string;

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        // crate jwt token 
       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "21d" });


        // sending response 
        return NextResponse.json(
            {message:"User Logged in Succesfully",
                token,
                user: { id: user._id, email: user.email },     
            },
            {status:200}
        );

    
        
    } catch (error) {
        console.log("Error -->",error);
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}