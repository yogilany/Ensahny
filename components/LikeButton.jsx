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
        <svg
          className="w-4 h-4  "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ) : (
        <svg
          className="w-4 h-4 transition-all  "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default LikeButton;
