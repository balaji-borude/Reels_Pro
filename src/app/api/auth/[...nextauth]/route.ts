import { authOptions } from "@/utils/AuthOptions"; 
// auth Option la import kel Utils folder madhen 

import NextAuth from "next-auth";


// handler 
const handler = NextAuth(authOptions);
export {handler as GET , handler as POST }
