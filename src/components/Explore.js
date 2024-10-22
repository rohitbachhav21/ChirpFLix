// import React from 'react'
// import { useState,useEffect } from 'react'

// const Explore = () => {

//   const [news, setNews] = useState([])

//   useEffect(()=>{
//     try {
//       const fetchNews = async () =>{
//         const res = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2024-07-06&sortBy=popularity&apiKey=332f823578574ec7b010f1b3ca078d17`)
//         const data = await res.json()
//         setNews(data.news)
//         console.log(data.news)
//       }
//       fetchNews()
//     } catch (error) {
//       console.log(error.message)
//     }
//   },[])

// if(!news){
//   return <div>Loading....</div>
// }
//   return (
//     <div className="w-screen md:w-2/3 h-screen border-l border-r border-gray-700">
//       {
//         news.map((index, article)=>{
//           return (
//             <div key={index}>
//               <div>{article.title}</div>
//             </div>
//           )
//         })
//       }

//     </div>
//   )
// }

// export default Explore

// // https://newsapi.org/v2/everything?q=Apple&from=2024-07-06&sortBy=popularity&apiKey=API_KEY

// src/NewsList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Explore = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=Apple&from=2024-07-06&sortBy=popularity&apiKey=332f823578574ec7b010f1b3ca078d17",
          {
            // params: {
            //   // country: 'us',  // you can change this to your preferred country
            //   apiKey: '332f823578574ec7b010f1b3ca078d17',  // replace with your NewsAPI key
            // },
          }
        );
        console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <p className="flex items-center justify-center w-screen md:w-2/3 h-screen border-l border-r border-gray-700 animate-pulse">
        {" "}
        Loading...
      </p>
    );
  }
  if (error)
    return (
      <p className="flex items-center justify-center w-screen md:w-2/3 h-screen border-l border-r border-gray-700 animate-pulse">
        Error loading news: {error.message}
      </p>
    );

  return (
    <div className="w-screen md:w-2/3 h-screen border-l border-r border-gray-700 overflow-y-scroll no-scrollbar">
      <div className="flex mt-2 mb-2 bg-opacity-70 sticky top-0 bg-gray-900 p-2">
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

        <h1 className="text-2xl ml-4">Explore some news articles</h1>
      </div>
   
      <div>
        {articles.map((article, index) => (
         article.title  ? (
          <Link to={article.url}>
          <div
            key={index}
            className="flex flex-col justify-center m-auto items-center"
          >
            <div className="mt-4 border border-gray-700 w-3/4 p-4 rounded-lg">
              <img
                src={article.urlToImage}
                alt="urltoimage"
                className="w-fit"
              ></img>
              <h2 className="text-xl">{article.title}</h2>
              <p className="text-sm text-justify">{article.description}</p>
              </div>
              </div>
              </Link>
         ) : null
        ))}
      </div>
    </div>
  );
};

export default Explore;


// <div className="p-1 bg-blue-400 text-white   text-center w-24 mt-1">
//                 <Link to={article.url}>Read More</Link>
//               </div>