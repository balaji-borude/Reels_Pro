
import { NextRequest,NextResponse } from "next/server";

import  {connectToDatabase} from "@/utils/db";

import User from "@/models/User";

export async function POST(req:NextRequest,res:NextResponse) {
    
    try {
        const {email,password} = await req.json();

        // validation 
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password are Required"},
                {status:400}
            )
        }

        await connectToDatabase();

       const existing_User= await User.findOne({email});

       if(existing_User){
              return NextResponse.json(
                {error:"Email is Alredy Exist "},
                {status:400}
            )
       };

       const user = await User.create({
        email,
        password
       })

       return NextResponse.json(
        {message:"User Registered Succesfully "},
        {status:200},
        // {user:user} // why we cant able to send user Response 
       );


    } catch (error) {
       return NextResponse.json(
        {error:error},
        {status:500}
       ) 
    }
} 