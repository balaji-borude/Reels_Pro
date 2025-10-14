"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

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

  interface formType {
    email: string;
    password: string;
  }

  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // onSubmit submitHandler(e: React.FormEvent<HTMLFormElement>)
  // submitHandler(e:React.FormEvent<HTMLInputElement>) --> he jevha input element la onSumit lavlele aste na tevaha use karayche
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata: formType = {
      email,
      password,
    };

    try {
      console.log("formdata", formdata);

      // validation
      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("login hit ");

    //   const data = await result;

      console.log("SignIn result:==>", result);



      if (result?.error) {
        setError(result.error);
      } else {
        //router.push("/dashboard"); // or wherever you want after login
        console.log("Move to dashboard");
      }
      alert("login sucesfull")
    } catch (error) {
      console.log(error);
      setError("Issue in Login User ");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <label id="email"> Email : </label>
      <input
        type="email"
        id="email"
        name="email"
        // onChange={changeHandler}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setemail(e.target.value)
        }
        value={email}
        placeholder="Enter Your Email"
      />

      <label id="password"> Password : </label>
      <input
        type="password"
        id="password"
        name="password"
        // onChange={changeHandler}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setpassword(e.target.value)
        }
        value={password}
        placeholder="Enter Your password"
      />

      {/* forgot pass */}
      <div>
        <p>
          Don’t have an account?
          <span
            onClick={() => router.push("/register")}
            className="cursor-pointer text-blue-500"
          >
            Sign Up
          </span>
        </p>
      </div>

      {/* Error Msg */}
      {error && <p className="text-red-600 text-xl">{error}</p>}

      <button type="submit" className="border px-3 py-2 hover:cursor-pointer">
        Login
      </button>
    </form>
  );
};

export default Login;
