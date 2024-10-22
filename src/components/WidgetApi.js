import React from "react";

import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
 
  TwitterFollowButton,
} from "react-twitter-embed";
import { Link } from "react-router-dom";

const Widget = () => {
  
return (

      <div className=" flex-col justify-center m-auto w-full p-2 h-screen overflow-y-scroll no-scrollbar ">

      <div className="flex mt-2 mb-2">
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

        <h1 className="text-2xl ml-4">Explore some widgets</h1>
      </div>

      <hr/>
      
    <div className="flex  justify-center items-center p-1 m-2">
    <TwitterTweetEmbed tweetId={"933354946111705097"} />
    </div>

      <h1 className="ml-4 mt-3 text-xl">Suggestions for you</h1>

      <div className="flex  justify-center items-center p-3 m-3 border border-gray-700 rounded-full">
        <div>
          <TwitterFollowButton screenName="bachhavrohit21" />
        </div>
      </div>

      <div className="flex  justify-center items-center p-3 m-3 border border-gray-700 rounded-full">
        <div>
          <TwitterFollowButton screenName="narendramodi" />
        </div>
      </div>

      <div className="flex  justify-center items-center p-3 m-3 border border-gray-700 rounded-full">
        <div>
          <TwitterFollowButton screenName="elonmusk" />
        </div>
      </div>

      <div className="flex  justify-center items-center p-3 m-3 border border-gray-700 rounded-full">
        <div>
          <TwitterFollowButton screenName="robertdowneyjr" />
        </div>
      </div>

      <div className="flex  justify-center items-center p-3 m-3 border border-gray-700 rounded-full">
        <div>
          <TwitterFollowButton screenName="saurabhnemade" />
        </div>
      </div>

      <TwitterTimelineEmbed sourceType="profile" screenName="elonmusk" />
      

      
    </div>
   
  );
};

export default Widget;
