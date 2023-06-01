"use client";

import { useState, useEffect } from "react";

const LikeButton = ({ isLiked, OnClick, isAuthenticated, likesCount }) => {
  const [liked, setLiked] = useState(isLiked);
  const [LikesCount, setLikesCount] = useState(likesCount);

  const handleClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
    if (liked) {
      setLikesCount((prev) => prev - 1);
    }
    if (!liked) {
      setLikesCount((prev) => prev + 1);
    }
    OnClick();
  };

  useEffect(() => {
    setLikesCount(likesCount);
    setLiked(isLiked);
  }, [likesCount, isLiked]);

  return (
    <button
      disabled={!isAuthenticated}
      className={`  w-auto font-readex  disabled:bg-red-100 space-x-2 inline-flex items-center mt-2  rounded-lg  text-xs   font-normal py-2 px-2  ${
        liked
          ? " bg-gradient-to-r from-pink-500 to-orange-400  text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-500"
          : " bg-gradient-to-r from-pink-100 to-orange-100  text-red-500 hover:bg-gradient-to-r hover:from-pink-200 hover:to-orange-200 "
      }`}
      onClick={handleClick}
    >
      <span className=" px-1 h-4 text-xs font-semibold rounded-full">
        {LikesCount}
      </span>
      | تفضيل
      {liked ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"></path>
  </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"></path>
      </svg>
      )}
    </button>
  );
};

export default LikeButton;
