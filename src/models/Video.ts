import mongoose, { Schema,model,models } from "mongoose";



export const VIDEO_DIMENSIONS={
    width:1080,
    height:1920
}as const


// created the iterface fot TS and giveing Types 
export interface IVideo{
    _id?:mongoose.Types.ObjectId,
    title:string,
    description:string,
    videoUrl:string,
    thumbnailUrl:string,
    controls?:boolean,
    transformation?:{
        height:number,
        width:number,
        quality?:number
    }
};

const videoSchmea = new Schema<IVideo>({
    title:{type:String, required:true},
    description:{type:String,required:true},
    videoUrl:{type:String, required:true},
    thumbnailUrl:{type:String, required:true},
    controls:{type:Boolean, default:true},
    transformation:{
        height:{type:Number , default:VIDEO_DIMENSIONS.height},
        width:{type:Number, default:VIDEO_DIMENSIONS.width},
        quality:{type:Number, min:1,max:100}
    }
},
{
    timestamps:true
})


// this is another syntax of export --> here insted of monggose.mode or models ===> we direcltly use them and --> they are callled in import stament of mongoose 
const Video = models?.Video || model<IVideo>("Video",videoSchmea);
export default Video;