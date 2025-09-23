    console.log("presnt in db.ts file ");


    import mongoose, { mongo } from "mongoose";

    // !--> Ts madhe error yeto ki --> >env file madhun MONGODB_URL yenar ka ! -> use kel ki te sangte yethunch yenar ahe 

    const MONGODB_URL = process.env.MONGODB_URL !;
    console.log("getting mongoDb URL", MONGODB_URL);
    if(!MONGODB_URL){
        throw new Error("MONGODB_URL is not present")
    };


    // global is big empty object --> is a variable --> 
    // yache type --> Types.d.ts => ya file madhe includekele ahe 
    let cached = global.mongoose;
    console.log("cached data",cached);

    if(!cached){
        cached= global.mongoose = {conn:null,promise:null};

    }

    export async function connectToDatabase(){

        // yethe check kert ahe ki cached madhe connection ahe ka 
        // asel tr return kr connection 
        if(cached.conn){
            return cached.conn;
        }


        if(!cached.promise){
            const opt = {
                bufferCommands:true,
                maxPoolSize:10, // kiti connetion mongodb sobat hote te define kerun ghete 

            }

            // jr promise create nasel tr --> create kernte 
            // 2. condition jr promise create asel tr --> fakt promise resolve, reject cha wait karycha        
            cached.promise =  mongoose.connect(MONGODB_URL,opt)
                                .then(()=>mongoose.connection);

        }

        // jr promise asel tr 2nd condtion 
        try {
            cached.conn = await cached.promise;
        } catch (error) {
            cached.promise = null;
            console.log("Error in DB Connection --> ", error);
            throw new Error(" check Db File ");
            throw error;
        }

        return cached.conn; 
    }