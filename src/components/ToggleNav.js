import React ,{useContext, useEffect, useState} from "react";
import logowithoutName from "../assets/LogoWithoutName.png";
import ThemeContext from "../context/Theme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/Firebase";
import { toast } from "react-toastify";
import {doc, getDoc} from "firebase/firestore"
const ToggleNav = ({allProps}) => {
  

const [userData, setUserdata] = useState(null)
  const navigate = useNavigate();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const User = auth.currentUser;

  const handleSignOut = async () => {
    try {
      if (User) {
        await delay(3000);
        toast.success("Signing Out!", {
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message, "not able to signout");
    }
  };


  useEffect(()=>{
    const fetchUserData = async () =>{
      try {
        auth.onAuthStateChanged(async (user)=>{
          console.log(user)
          const docRef = doc(db, "Users", user.uid)
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            setUserdata(docSnap.data())
            console.log(docSnap.data())
          }
        })
      } catch (error) {
        console.log(error.message,"error while fetching the user")
      }
    }
  
    fetchUserData()
  },[])

  const {fetchUserProfile,
    name,
      username,
      profileImageUrl,
  }=allProps

  useEffect(()=>{
    fetchUserProfile()
  },[User])


  return (
    <div className="  md:w-1/3  ">
    <div className="flex flex-col justify-center items-center  m-auto left-52">
        <div className="mt-2 relative">
        

          <Link to="/Page" relative="">
            <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="skyblue"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
                Home
              </div>
            </div>
          </Link>

          <Link to="/Page/Explore">
            <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="skyblue"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
                Articles
              </div>
            </div>
          </Link>

          <Link to="/Page/WidgetApi">
            <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="skyblue"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>

              <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
                widget
              </div>
            </div>
          </Link>

          <Link to="/Page/Profile">
            <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="skyblue"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
                Profile
              </div>
            </div>
          </Link>

          <div
            onClick={handleSignOut}
            className="flex justify-left mt-5 cursor-pointer bg-black rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="skyblue"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>

            <div className="font-sans font-semibold text-2xl  text-blue-300 ml-3">
              Sign Out
            </div>
          </div>
        </div>

        <div className="absolute  bottom-6">
        <div className="flex  justify-left items-center mt-5 hover:cursor-pointer border border-gray-700 shadow-2xl bg-gray-700 rounded-full p-2 w-60 h-22  ">
          <img alt="prodilr" width={50} height={50} className="rounded-full w-14 h-14"
            src={profileImageUrl  || "https://via.placeholder.com/1200x300"} >
            
            </img>
          
            

          <div className="font-sans font-semibold  ml-3">
           {
            userData ? (
              <>
              <div className="text-2xl text-gray-500 font-bold  ">{name || userData.name} </div>
              <div className="text-gray-500"> @{username || userData.username}</div>
              </>
            ):(
            <div>
              Loading...
            </div>
            )
           }
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ToggleNav;

// <div className="flex flex-col  items-center m-auto left-52">
//   <div className="mt-2  flex-col content-between">
   

//     <Link to="/Page" relative="">
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2 ">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//         stroke="skyblue"
//         className="size-8"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
//         />
//       </svg>
//       <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//         Home
//       </div>
//     </div>
//     </Link>
//     <Link to="/Page/Explore" >
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="skyblue"
//       className="size-8"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//       />
//     </svg>

//     <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//       Explore
//     </div>
//   </div>
//     </Link>

//     <Link to="/Page/Notifications">
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//         stroke="skyblue"
//         className="size-8"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
//         />
//       </svg>

//       <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//         Notifications
//       </div>
//     </div>
//     </Link>

//     <Link to='/Page/Messages'>
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="skyblue"
//       className="size-8"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
//       />
//     </svg>

//     <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//       Messages
//     </div>
//   </div>
//     </Link>
   
//     <Link to="/Page/Communities">
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//         stroke="skyblue"
//         className="size-8"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
//         />
//       </svg>

//       <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//         Communities
//       </div>
//     </div>
//     </Link>

//     <Link to="/Page/Widget">
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2 md:hidden">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="skyblue"
//       className="size-8"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
//       />
//     </svg>

//     <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//       widget
//     </div>
//   </div>
//     </Link>
    
//     <Link to="/Page/Profile">
//     <div className="flex justify-left mt-5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="skyblue"
//       className="size-8"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//       />
//     </svg>

//     <div className="font-sans font-semibold text-2xl text-blue-300 ml-3">
//       Profile
//     </div>
//   </div>
//     </Link>

    

    
//     <div onClick={toggleTheme} className="flex justify-left mt-5 cursor-pointer bg-black rounded-full p-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//         stroke="white"
//         className="size-8"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
//         />
//       </svg>

//       <div className="font-sans font-semibold text-2xl  text-white ml-3">
//       {theme === 'dark' ? 'Light' : 'Dark'}
//       </div>
//     </div>

//     </div>
//     <div className="flex justify-left items-center w-44 mt-5 hover:cursor-pointer bg-gray-200 rounded-full p-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//         stroke="skyblue"
//         className="size-8"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//         />
//       </svg>

//       <div className="font-sans font-semibold  text-blue-300 ml-3">
//         <div className="text-2xl">Name</div>
//         <div>Username</div>
//       </div>
//     </div>
// </div>