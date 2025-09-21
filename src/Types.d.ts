
import { Connection } from "mongoose"


// global he ek empty object create kel ahe 
// he db.ts file madhe use kel ahe check the connnection with db 

// yethe global and mongoose --> ya doghanchya type declaration krt ahe 
// db.ts file madhe ahe te 
declare global {
    // yethe fakt var use karte 

    // mongoose cha datatype ek tr connectiona asel kinvha promise type cha asel 
    // coonection zale nahi tr null return karin 
    var mongoose:{
        // connection show (if DB is connected )
        conn:Connection | null
        // if Db is not connected 
        promise:Promise | null
    }
}

export {};