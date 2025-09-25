import { authOptions } from "@/utils/AuthOptions";

import NextAuth from "next-auth";


// handler 
const handler = NextAuth(authOptions);
export {handler as GET , handler as Post }