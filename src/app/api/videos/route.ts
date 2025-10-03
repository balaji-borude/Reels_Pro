import Video, { IVideo } from "@/models/Video";
import { authOptions } from "@/utils/AuthOptions";
import { connectToDatabase } from "@/utils/db"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// getAll videos 
export async function GET(){
    try {
        await connectToDatabase();
        // lean method ????
        const Videos = await Video.find({}).sort({createdAt:-1}).lean()

        if(Videos.length ==0 || !Videos ){
            return NextResponse.json([],{status:200})
        };

        return NextResponse.json(Videos);



    } catch (error) {
        console.log("Error in getting the vicdeos  ",error);
        return NextResponse.json(
            {
                error:"failed to fetch the videos "
            },
            {status:500}
        )
    }
};

// create new video 
export async function POST(req:NextRequest){
    try {
        // session he Next chya auth kadunch bhetnar
       const session= await getServerSession(authOptions);
        
       if(!session){
        return NextResponse.json(
            {error:"Unauthorized  , User not Logged In "},
            {status:401}
        )
       };

       // db connection 
       await connectToDatabase();

       const body:IVideo = await req.json();

       // validation
       if(
        !body.title ||
        !body.description||
        !body.videoUrl||
        !body.thumbnailUrl
       ){
        return NextResponse.json(
            {error:"All Fields are required "},
            {status:400}
        )
       };

       const videoData={
        ...body,
        controls: body.controls ?? true,
        transformation:{
            height:1920,
            width:1080,
            quality:body.transformation?.quality ?? 100
        }
       }

       const newVideo = Video.create(videoData); 
       return NextResponse.json(
           {newVideo}
       )


    } catch (error) {
         console.log("Error in creating the videos  ",error);
        return NextResponse.json(
            {
                error:"failed to create the videos "
            },
            {status:500}
        )
    }
}