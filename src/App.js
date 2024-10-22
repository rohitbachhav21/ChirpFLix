import React,{useState, useEffect} from "react";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Page from "./components/Page.js";

import Feed from "./components/Feed.js";

import Explore from "./components/Explore.js";
import Profile from "./components/Profile.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WidgetApi from "./components/WidgetApi.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../src/firebase/Firebase.js";
import { toast } from "react-toastify";

const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  let [profileImageUrl, setProfileImageUrl] = useState("");
  let [coverImageUrl, setCoverImageUrl] = useState("");
  const user = auth.currentUser;
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  const togglePopupProfileImage = () => {
    setImage(!image);
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setCoverImage(file)
      }
    }
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setProfileImage(file);
        
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (profileImage) {
      const profileImageRef = ref(storage, `images/${profileImage.name}`);
      await uploadBytes(profileImageRef, profileImage);
      profileImageUrl = await getDownloadURL(profileImageRef);
    }
    if (coverImage) {
      const coverImageRef = ref(storage, `images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      coverImageUrl = await getDownloadURL(coverImageRef);
    }

    if (user) {
      await setDoc(
        doc(db, "Profile", user.uid),
        {
          profileImageUrl,
          coverImageUrl,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    setProfileImage(null);
    setCoverImage(null);
    setImage(false);

    // fetchUserProfile()
  };


  const handleProfileUpdate = async () => {
    try {
      if (user) {
        const userProfile = {
          name: name || "",
          username: username || "",
          bio: bio || "",
          link: link || "",
          profileImageUrl: profileImageUrl || "",
          coverImageUrl: coverImageUrl || "",
        };

        await setDoc(doc(db, "Profile", user.uid), userProfile);

        toast.success("Profile has been updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "#000",
            color: "#fff",
          },
        });
      }

      togglePopup(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };



    const fetchUserProfile = async () => {
      if (user) {
        const docRef = doc(db, "Profile", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name );
          setUsername(data.username );
          setBio(data.bio );
          setLink(data.link );
          setProfileImageUrl(data.profileImageUrl );
          setCoverImageUrl(data.coverImageUrl );
          console.log(data.name,data.username, data.bio, data.link, data.profileImageUrl, data.coverImageUrl)
        }
      }
    };
    
    const allProps = {
      togglePopup,
      togglePopupProfileImage,
      handleCoverImage,
      handleProfileImage,
      handleSubmit,
      handleProfileUpdate,
      fetchUserProfile,
      isOpen,
      name,
      username,
      bio,
      link,
      image,
      profileImage,
      coverImage,
      profileImageUrl,
      coverImageUrl,
      setName,
      setUsername,
      setBio,
      setLink
    }
  
    

 
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route exact path="/" element={<LoginForm   />}></Route>
          <Route exact path="/register" element={<RegisterForm   />}></Route>
          <Route exact path="/Page" element={<Page allProps={allProps} />}>
            <Route exact path="/Page" element={<Feed allProps={allProps} />}></Route>
            <Route exact path="/Page/Explore" element={<Explore />}></Route>
           
            <Route exact path="/Page/Profile" element={<Profile allProps={allProps} />}></Route>
            
            <Route exact path="/Page/WidgetApi" element={<WidgetApi/>}></Route>
            </Route>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
};

export default App;
