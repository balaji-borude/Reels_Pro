"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Register = () => {
    const [email,setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("");

    const [error,setError] = useState <string | null > ("");


    // link or router
    const router = useRouter();
    //router.push("/login");

    // method handle submit 
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>
    {
        e.preventDefault();

        // validation
        if(password == confirmPassword){
            setError("Your Password Does Not matched ")

        }

        // submitting value 
        try {
            const res = await fetch("/api/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            });

            // respones madhe data baher kadhla --> res ha json madhech yeto 
            const data = res.json();
            if(!res.ok){
                setError("Registration failed ")
                throw new Error("Issue in Registering the User ");
            }

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div>
            Thisis register page 
        </div>
    );
}

export default Register;
