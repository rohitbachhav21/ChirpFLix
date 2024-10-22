import React, { useEffect, useState } from "react";

import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
 
  TwitterFollowButton,
} from "react-twitter-embed";


const Widget = () => {
  
  return (

      <div className="hidden md:w-1/3 md:block h-screen sticky top-0 overflow-y-scroll no-scrollbar ">
      
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
