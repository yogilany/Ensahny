'use client';

import { useState, useEffect } from 'react';

const LikeButton = ({isLiked, OnClick, isAuthenticated, likesCount}) => {
const [liked, setLiked] = useState(isLiked);
const [LikesCount, setLikesCount] = useState(likesCount);


  const handleClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
    if(liked){
      setLikesCount((prev) => prev - 1);
  };
    if(!liked){
        setLikesCount((prev) => prev + 1);
    };
    OnClick();
}

useEffect(() => {
    setLikesCount(likesCount)
    setLiked(isLiked)
}, [likesCount,isLiked])

  return (
    <button
    disabled={!isAuthenticated}
    className={`  disabled:bg-red-100 space-x-2 inline-flex items-center mt-2  rounded-lg  text-sm  font-medium py-2 px-2  ${
      liked ? 'bg-red-500 text-white hover:bg-red-600 ' : 'bg-red-100 text-red-500 hover:bg-red-200 '
    }`}
    onClick={handleClick}
  >  {liked ? "Liked" : "Like"}
  <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
    {LikesCount}
  </span>
</button>

    );
};

export default LikeButton;