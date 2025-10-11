"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {

    // const [formData, setFormData] = useState({
    //     email:"",
    //     password:""
    // });
    // change handerl 
    // function changeHandler(e){
    //     setFormData((prevData)=>({
    //         ...prevData,
    //         [e.target.name]:e.target.value
    //     }))
    // }

    interface formType{
        email:string,
        password:string
    }
    
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");


    const router = useRouter();


    // onSubmit submitHandler(e: React.FormEvent<HTMLFormElement>)
    // submitHandler(e:React.FormEvent<HTMLInputElement>) --> he jevha input element la onSumit lavlele aste na tevaha use karayche
    function submitHandler(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formdata:formType ={
            email,
            password
        }
        console.log("formdata",formdata);
       
    }


    return (
        <form onSubmit={submitHandler}>
            <label id='email'> Email : </label>
            <input 
                type='email'
                id='email'
                name='email'
                // onChange={changeHandler}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setemail(e.target.value)}
                value={email}
                placeholder='Enter Your Email'
            />


            <label id='password'> Password : </label>
            <input 
                type='password'
                id='password'
                name='password'
                // onChange={changeHandler}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setpassword(e.target.value)}
                value={password}
                placeholder='Enter Your password'
            />

            {/* forgot pass */}
            <div>
                <p> Do not have account <span onClick={()=> router.push("/register")}> SignIn</span> </p>
                
            </div>
            <button type='submit' className='border px-3 py-2 hover:cursor-pointer'>Login </button>

        </form>

       
    );
}

export default Login;
