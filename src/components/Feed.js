


// import React, { useEffect, useState, useRef } from "react";
// import logowothoutImage from "../assets/LogoWithoutName.png";
// import ToggleNav from "./ToggleNav";
// import { db, storage, auth } from "../firebase/Firebase";
// import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Feed = () => {
//   const imageRef = useRef();
//   const videoRef = useRef();
//   const gifRef = useRef();
//   const [toggle, setToggle] = useState(false);
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [gif, setGif] = useState(null);
//   const [posts, setPosts] = useState([]); // State to store fetched posts
//   const user = auth.currentUser

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         setImage(file);
//       } else if (file.type.startsWith('video/')) {
//         setVideo(file);
//       } else if (file.type === 'image/gif') {
//         setGif(file);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let imageUrl = '', videoUrl = '', gifUrl = '';

//     if (image) {
//       const imageRef = ref(storage, `postImages/${image.name}`);
//       await uploadBytes(imageRef, image);
//       imageUrl = await getDownloadURL(imageRef);
//     }

//     if (video) {
//       const videoRef = ref(storage, `postVideos/${video.name}`);
//       await uploadBytes(videoRef, video);
//       videoUrl = await getDownloadURL(videoRef);
//     }

//     if (gif) {
//       const gifRef = ref(storage, `postGifs/${gif.name}`);
//       await uploadBytes(gifRef, gif);
//       gifUrl = await getDownloadURL(gifRef);
//     }

//     await addDoc(collection(db, "Posts"), {
//       description,
//       imageUrl,
//       videoUrl,
//       gifUrl,
//       createdAt: serverTimestamp(),
//     });

//     setDescription('');
//     setImage(null);
//     setVideo(null);
//     setGif(null);

//     fetchPosts(); // Fetch posts again after adding a new one
//   };

  

//   const fetchPosts = async () => {
//     const querySnapshot = await getDocs(collection(db, "Posts"));
//     const fetchedPosts = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setPosts(fetchedPosts);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleNavbar = () => {
//     setToggle(!toggle);
//   };

//   return (
//     <>
//       <div className="w-screen md:w-2/3 h-screen border-l border-r border-gray-700">
//         <div className="md:hidden flex justify-between items-center">
//           <img
//             src={logowothoutImage}
//             alt="profile"
//             className="w-14 m-1 rounded-full border-blue-950"
//             onClick={handleNavbar} 
//           />
//         </div>
//         <hr />
//         <div>
//           {toggle ? (
//             <div className="block md:hidden"><ToggleNav /></div>
//           ) : (
//             <div className="h-screen border-l-0 border-r-0">
//             <div className="h-44  bg-black sticky top-0 border-b-2 border-t border-gray-700">
//               <div className="flex mt-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="skyBlue"
//                   className="size-12"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                   />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="What is happening?!"
//                   className="outline-none ml-2 bg-black text-white"
//                   onChange={(e) => setDescription(e.target.value)}
//                   name="description"
//                   value={description}
//                 />
//               </div>
//               <hr className="p-4 m-4" />
//               <div className="flex justify-between">
//                 <div className="flex">
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       ref={imageRef}
//                       className="hidden"
//                       onChange={handleFileChange}
//                       name="image"
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="skyblue"
//                       className="size-6"
//                       onClick={() => imageRef.current.click()}
//                       style={{ cursor: "pointer", marginLeft:"10px" }}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <input
//                       type="file"
//                       accept="video/*"
//                       ref={videoRef}
//                       className="hidden"
//                       name="video"
//                       onChange={handleFileChange}
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={2}
//                       stroke="skyblue"
//                       className="size-6"
//                       onClick={() => videoRef.current.click()}
//                       style={{ cursor: "pointer", marginLeft:"10px" }}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/gif"
//                       ref={gifRef}
//                       className="hidden"
//                       name="gif"
//                       onChange={handleFileChange}
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="skyblue"
//                       className="size-6"
//                       onClick={() => gifRef.current.click()}
//                       style={{ cursor: "pointer", marginLeft:"10px" }}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div onClick={handleSubmit} className="bg-blue-500 mr-3 cursor-pointer text-white p-1 rounded-2xl w-16 text-center">Post</div>
//               </div>
//               </div>
//               <div className="h-screen overflow-y-scroll no-scrollbar ">
//               {posts.map((post) => (
//                 <div key={post.id} className="flex flex-col justify-center text-left items-center m-auto border-b-2 border-gray-500 " >
//                 {post.imageUrl && <img src={post.imageUrl} alt="post" className="w-3/4 rounded-lg " />}
//                 {post.videoUrl && <video src={post.videoUrl} controls />}
//                 {post.gifUrl && <img src={post.gifUrl} alt="gif" />}
//                 <p className="text-xl font-semibold   p-2">{post.description}</p>
//                 </div>
//               ))}
//             </div>
//               </div>
            
//           )}
//         </div>
       
//       </div>
//     </>
//   );
// };

// export default Feed;



import React, { useEffect, useState, useRef } from "react";
import logowothoutImage from "../assets/LogoWithoutName.png";
import ToggleNav from "./ToggleNav";
import { db, storage, auth } from "../firebase/Firebase";
import { collection, addDoc, serverTimestamp, setDoc, getDocs, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Feed = ({allProps}) => {
  const imageRef = useRef();
  const videoRef = useRef();
  const gifRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [gif, setGif] = useState(null);
  const [posts, setPosts] = useState([]); // State to store fetched posts
  // const User = auth.currentUser;

  const {profileImageUrl, name, username} = allProps
  
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, []);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else if (file.type.startsWith('video/')) {
        setVideo(file);
      } else if (file.type === 'image/gif') {
        setGif(file);
      }
    }
  };

  const handleSubmit = async (e) => {

    // if (!name || !username) {
    //   alert('User details are missing');
    //   return;
    // }

    e.preventDefault();

    let imageUrl = '', videoUrl = '', gifUrl = '';

    if (image) {
      const imageRef = ref(storage, `postImages/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    if (video) {
      const videoRef = ref(storage, `postVideos/${video.name}`);
      await uploadBytes(videoRef, video);
      videoUrl = await getDownloadURL(videoRef);
    }

    if (gif) {
      const gifRef = ref(storage, `postGifs/${gif.name}`);
      await uploadBytes(gifRef, gif);
      gifUrl = await getDownloadURL(gifRef);
    }

    await addDoc(collection(db, "Posts"), {
      description,
      imageUrl,
      videoUrl,
      gifUrl,
      createdAt: serverTimestamp(),
      userId: user.uid,
      Name: name || user.displayName,
      Username: username || user.email ,// Assuming username is stored in displayName
    });

    setDescription('');
    setImage(null);
    setVideo(null);
    setGif(null);

    fetchPosts(); // Fetch posts again after adding a new one
  };

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    const fetchedPosts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //////////////////////////////////////////////////////////////
  // const [description, setDescription] = useState('');
  // const [media, setMedia] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged( (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     setMedia(e.target.files[0]);
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!user) {
  //     alert('You need to be logged in to create a post');
  //     return;
  //   }

  //   const postRef = doc(collection(db, 'posts'));
  //   const postData = {
  //     description,
  //     mediaUrl: media ? URL.createObjectURL(media) : null,
  //     userId: user.uid,
  //     userName: user.displayName || user.email,
  //     createdAt: new Date()
  //   };
  //   await setDoc(postRef, postData);
  //   alert('Post added successfully');
  //   setDescription('');
  //   setMedia(null);
  //   fetchPosts(); // Fetch posts again to update the list
  // };

  // const fetchPosts = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
  //   const postsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //   setPosts(postsList);
  // };

  // useEffect(()=>{
  //   fetchPosts();
  // },[user])

  const handleNavbar = () => {
    setToggle(!toggle);
  };

  

  return (
    <>
      <div className="w-screen md:w-2/3 h-screen border-l border-r border-gray-700">
        <div className="md:hidden flex justify-between items-center">
          <img
            src={logowothoutImage}
            alt="profile"
            className="w-14 m-1 rounded-full border-blue-950"
            onClick={handleNavbar} 
          />
        </div>
        <hr />
        <div>
          {toggle ? (
            <div className="block md:hidden"><ToggleNav allProps={allProps}  /></div>
          ) : (
            <div className="h-screen border-l-0 border-r-0">
              <div className="h-44 bg-black sticky top-0 border-b-2 border-t border-gray-700">
                <div className="flex mt-4 ml-4">
                <img alt="prodilr" width={50} height={50} className="rounded-full w-14 h-14"
                src={profileImageUrl  || "https://via.placeholder.com/1200x300"} >
                
                </img>
                  <input
                    type="text"
                    placeholder="What is happening?!"
                    className="outline-none ml-2 bg-black text-white"
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    value={description}
                  />
                </div>
                <hr className="p-4 m-4" />
                <div className="flex justify-between">
                  <div className="flex">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={imageRef}
                        className="hidden"
                        onChange={handleFileChange}
                        name="image"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="skyblue"
                        className="size-6"
                        onClick={() => imageRef.current.click()}
                        style={{ cursor: "pointer", marginLeft:"10px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="video/*"
                        ref={videoRef}
                        className="hidden"
                        name="video"
                        onChange={handleFileChange}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="skyblue"
                        className="size-6"
                        onClick={() => videoRef.current.click()}
                        style={{ cursor: "pointer", marginLeft:"10px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/gif"
                        ref={gifRef}
                        className="hidden"
                        name="gif"
                        onChange={handleFileChange}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="skyblue"
                        className="size-6"
                        onClick={() => gifRef.current.click()}
                        style={{ cursor: "pointer", marginLeft:"10px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div onClick={handleSubmit} className="bg-blue-500 mr-3 cursor-pointer text-white p-1 rounded-2xl w-16 text-center">Post</div>
                </div>
              </div>
              <div className="h-screen overflow-y-scroll no-scrollbar ">
              {posts.map((post) => (
                <div key={post.id} className="flex flex-col   border-b-2 border-gray-500 ">
                  <p className="text-sm font-medium text-white ml-4 mb-4 ">{post.Name || post.Username }</p> 
                <div className="flex justify-center items-center ">
                {post.imageUrl && <img src={post.imageUrl} alt="post" className="w-3/4 rounded-lg" />}
                {post.videoUrl && <video src={post.videoUrl} controls />}
                {post.gifUrl && <img src={post.gifUrl} alt="gif" />}
                </div>
                  <p className="text-xl font-semibold p-2">{post.description}</p>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;

// {post && (
//                 <div>
//                   <h3>Post Description:</h3>
//                   <p>{post.description}</p>
//                   {post.mediaUrl && <img src={post.mediaUrl} alt="Post Media" />}
//                   <p>Posted by: {post.userName}</p>
//                 </div>
//               )}




