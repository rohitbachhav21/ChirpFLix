import React,{useState} from "react";
import logo from "../assets/Logo.png";
import logowithoutName from "../assets/LogoWithoutName.png";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import google from "../assets/google.png"
import {doc, setDoc} from "firebase/firestore"
// import axios from "axios"

const RegisterForm = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:"",
    username:""
  })
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const provider = new GoogleAuthProvider()

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = auth.currentUser;
      console.log(user)
      
      if(user){
        console.log("user created successfully")
        
        await setDoc(doc(db, "Users", user.uid),{
          email:user.email,
          name:formData.name,
          username:formData.username,
          password:formData.password

        })
        
        setFormData({
          username:"",
          email: "",
          password: "",
          name:""
        })
        toast.success("User created successfully!", {
          className: "black-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
       
        await delay(2000);
        navigate("/")
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error("User with this email already exists!",{
        position:"top-center",
        
      })
    }
  }

  
  const handleInput = (e) =>{
    const {name, value}= e.target
    setFormData({
      ...formData,
      [name]: value
    })
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
        <img src={logo} alt="logo" />
      </div>
      <div className="flex flex-col justify-center w-full h-screen items-center bg-blue-950 text-white">
        <div className="block md:hidden w-full mb-4">
          <img
            src={logowithoutName}
            alt="logo"
            className="border w-1/2 rounded-full m-auto border-blue-950"
          />
        </div>
        <div className="flex flex-col ">
          <input
            type="text"
            placeholder="Name"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            onChange={handleInput}
            name="name"
            value={formData.name}
          ></input>
          <input
            type="text"
            placeholder="username"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            onChange={handleInput}
            name="username"
            value={formData.username}
          ></input>
          <input
            type="email"
            placeholder="email"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            onChange={handleInput}
            name="email"
            value={formData.email}

          ></input>
          <input
            type="password"
            placeholder="password"
            className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950"
            onChange={handleInput}
            name="password"
            value={formData.password}
          ></input>
         
          <button onClick={handleSubmit} className="p-3 w-80 outline-none border border-gray-300 rounded-lg m-1 bg-blue-950  shadow-xl">
            Sign Up
          </button>
        </div>
        <div className="m-1">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400">
            Sign In
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

export default RegisterForm;
