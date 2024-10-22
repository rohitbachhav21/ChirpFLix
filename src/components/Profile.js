



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {  auth } from "../firebase/Firebase";

const Profile = ({allProps}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [bio, setBio] = useState("");
  // const [link, setLink] = useState("");
  // const [image, setImage] = useState(false);
  // const [profileImage, setProfileImage] = useState(null);
  // const [coverImage, setCoverImage] = useState(null);
  // let [profileImageUrl, setProfileImageUrl] = useState("");
  // let [coverImageUrl, setCoverImageUrl] = useState("");

  const user = auth.currentUser;

  const {isOpen,name,username,bio,link,image,profileImageUrl,coverImageUrl,
    fetchUserProfile,
    togglePopup,
      togglePopupProfileImage,
      handleCoverImage,
      handleProfileImage,
      handleSubmit,
      handleProfileUpdate,
      setName,
      setUsername,
      setBio,
      setLink

  } = allProps

  

  useEffect(()=>{
    fetchUserProfile()
  },[user])

  

  return (
    <div className="w-screen md:w-2/3 h-screen border-l bg-black border-r border-gray-700">
      <div className="flex bg-opacity-70 sticky top-0 bg-gray-700 p-2">
        <Link to="/Page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="skyblue"
            className="size-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="text-2xl ml-4">Profile</h1>
      </div>
      <div className="min-h-screen flex flex-col ">
        <header className="w-full relative">
          <img
            onClick={togglePopupProfileImage}
            src={coverImageUrl || "https://via.placeholder.com/1200x300"}
            alt="Cover"
            className="w-full h-60 object-cover"
          />
          <div className="absolute bottom-0 left-28 transform -translate-x-1/2 translate-y-1/2 flex">
            <img
              onClick={togglePopupProfileImage}
              src={profileImageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-44 h-44 rounded-full border-4 border-white"
            />
          </div>
          <button
            onClick={togglePopup}
            className="absolute right-0 border p-1 m-1 rounded-full"
          >
            edit profile
          </button>
        </header>
        <div className="text-white mt-24 ml-10 flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-500">@{username}</p>
            <p className="text-gray-500 text-justify">{bio}</p>
            <a href={link} className="text-blue-900 cursor-pointer">{link}</a>
          </div>

          <hr />

          {image && (
            <div className="fixed p-8 inset-0 flex justify-center items-center border border-gray-500">
              <div className="bg-gray-900 md:w-1/2 rounded-lg p-8 shadow-lg relative w-full">
                <button
                  onClick={togglePopupProfileImage}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Upload Cover Image</h2>
                <div className="flex flex-col">
                  <input type="file" onChange={handleCoverImage} />
                  <input type="file" onChange={handleProfileImage} />
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {isOpen && (
            <div className="fixed p-8 inset-0 flex justify-center items-center border border-gray-500">
              <div className="bg-gray-900 md:w-1/2 rounded-lg p-8 shadow-lg relative w-full">
                <button
                  onClick={togglePopup}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none border border-gray-600 p-1 bg-gray-900 mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="outline-none border border-gray-600 p-1 bg-gray-900 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Bio"
                    className="outline-none border border-gray-600 p-1 bg-gray-900 mb-4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    className="outline-none border border-gray-600 p-1 bg-gray-900 mb-4"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
