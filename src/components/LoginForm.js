import React from "react";
import logo from "../assets/Logo.png";
import logowithoutName from "../assets/LogoWithoutName.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";
import { auth , db} from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import google from "../assets/google.png"
import {doc, setDoc} from "firebase/firestore"

const LoginForm = () => {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  

  const navigate = useNavigate()

  const provider = new GoogleAuthProvider();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInput = (e) =>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })

  }
  const handleSubmit = async (e) =>{
    
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = auth.currentUser;
      if(user){
        
        console.log("User logged in Successfully")
        console.log(formData.email)
        toast.success("Navigating!",{
          position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                  }
        })
        await delay(2000)
        navigate("/Page")
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error("Invalid credentials",{
        position:"top-center"
      })

    }
  }

  const signInwithGoogle = async () =>{
    try {
      await signInWithPopup(auth, provider)
      const user = auth.currentUser;
      console.log(user)
      if(user){
        
        await setDoc(doc(db, "Users", user.uid),{
          email:user.email,
          name:user.displayName
        })
        
        await delay(2000)
        navigate("/Page")
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Action has been forbidden!",{
        position:"top-center",
        style:{
          background: "black"
        }
      })
    }
  }
  return (
    <div className="flex">
      <div className="hidden md:block md:w-full">
        <img src={logo} alt="logo"  />
      </div>
     
      <div className="flex flex-col justify-center w-full h-screen items-center bg-blue-950 text-white">
      <div className="block md:hidden w-full mb-4">
      <img src={logowithoutName} alt="logo" className="border w-1/2 rounded-full m-auto border-blue-950"  />
    </div>
        <div className="flex flex-col ">
          <input
            type="email"
            placeholder="email"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            name="email"
            value={formData.email}
            onChange={handleInput}
          ></input>
          <input
            type="password"
            placeholder="password"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            name="password"
            value={formData.password}
            onChange={handleInput}
          ></input>
          <button onClick={handleSubmit} className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950  shadow-xl">
            Sign Up
          </button>
        </div>
        <div className="m-1">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Sign Up
          </Link>
        </div>
        <br />
        <hr />
        <br />

        <button onClick={signInwithGoogle} className=" flex justify-center items-center  p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950  shadow-xl">
          <img src={google} alt="google" width={25} height={25} ></img>
          <div className="ml-2 ">Sign In with Google</div>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
