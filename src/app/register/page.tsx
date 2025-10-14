"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ReactFormState } from 'react-dom/client';

 const Register = () => {
//     const [email,setEmail] = useState("")
//     const[password, setPassword] = useState("")
//     const[confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        phonenumber:""

    });

    // link or router
    const router = useRouter();
    //router.push("/login");

    // method handle submit 
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{


        e.preventDefault();

        console.log("printing the formData",formData);

        console.log(formData.email);
        // // validation
        // if(password == confirmPassword){
        //     setError("Your Password Does Not matched ")

        // }

        // submitting value 
        try {
            
            const res = await fetch("/api/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });

            // respones madhe data baher kadhla --> res ha json madhech yeto 
            const data = res.json();

            if(!res.ok){
                setError("Registration failed ")
                throw new Error("Issue in Registering the User ");
            }
                  console.log("Registered user:", data);
      router.push("/login");

        } catch (error) {
            console.error(error);
            setError("Something went wrong")
        }

    }
    



    function changeHandler(e: React.ChangeEvent<HTMLInputElement>){
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='firstName'>firstName:</label>
                <input
                    type='text'
                    name='firstname'
                    value={formData.firstname}
                    onChange={changeHandler}
                    placeholder='Enter your firstName'
                />
                <label htmlFor='lastName'>lastName:</label>
                <input
                    type='text'
                    name='lastname'
                    value={formData.lastname}
                    onChange={changeHandler}
                    placeholder='Enter your lastName'
                />
                <label htmlFor='lastName'>phoneNumber:</label>
                <input
                    type='number'
                    name='phonenumber'
                    value={formData.phonenumber}
                    onChange={changeHandler}
                    placeholder='Enter your phonenumber'
                />

                <label htmlFor='email'>email:</label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter your email'
                />

                <label htmlFor='password'>password:</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter your password'
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type='submit'> SignIn</button>
            </div>
        </form>
    );
}

export default Register;
