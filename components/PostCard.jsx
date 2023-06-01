"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LikeButton from "@components/LikeButton";
import Link from "next/link";
import Dropdown from "./Dropdown";

const PostCard = ({
  notify,
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  handleCategoryClick,
}) => {
  const likesCount = post?.likes.length;

  const [time, setTime] = useState("");

  const [copied, setCopied] = useState("");

  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(false), 3000);
    notify();
  };

  function handleLikeClick() {
    // e.preventDefault()/

    // get the user id
    const userId = session?.user.id;
    // get the post id
    const postId = post._id;
    // if the user has liked the post, remove the like using mongoose
    try {
      const res = fetch(`/api/post/like/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (res.ok) {
        console.log("Like added");
      }
    } catch (e) {
      console.log("Opps! Something went wrong");

      console.log(e.message);
      throw Error(e.message);
    }
  }

  useEffect(() => {
    const dateStr = post?.created_at;
    const date = new Date(dateStr);
    const now = new Date();

    const elapsedTime = Math.floor((now - date) / 1000) + 3; // Calculate elapsed time in seconds

    if (elapsedTime < 60) {
      // Less than a minute
      setTime("Just now");
    } else if (elapsedTime < 3600) {
      // Less than an hour
      const minutes = Math.floor(elapsedTime / 60);
      setTime(minutes + " minutes ago");
    } else if (elapsedTime < 86400) {
      // Less than a day
      const hours = Math.floor(elapsedTime / 3600);
      setTime(hours + " hours ago");
    } else if (elapsedTime < 604800) {
      // Less than a week
      const days = Math.floor(elapsedTime / 86400);
      setTime(days + " days ago");
    } else {
      // A week or more
      const weeks = Math.floor(elapsedTime / 604800);
      // conver it to arabic number

      setTime(weeks + " weeks ago");
    }
  }, []);

  return (
    <div className="flex-1  text-right    break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter w-full h-fit">
      <div className="flex justify-between items-start gap-0.5">
        {session?.user.id === post?.creator?._id &&
        pathName === `/profile/${post?.creator?._id}` ? (
          <Dropdown
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleCopy={handleCopy}
          />
        ) : (
          <div className="" onClick={handleCopy}>
            <button className="text-gray-400 border border-gray-400 hover:bg-gray-300 hover:text-white active:bg-gray-400 active:outline-none active:text-white  font-medium rounded-lg text-xs  p-1 text-center inline-flex items-center mr-2  ">
          
              <svg                  className="w-4 h-4"
 fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
</svg>
            </button>
          </div>
        )}

        <Link
          href={
            post?.creator
              ? `/profile/${post?.creator?._id}`
              : `/profile/${null}`
          }
        >
          <div className="flex flex-1 justify-end items-center gap-3 cursor-pointer">
            <div className="flex flex-col  ">
              <h3 className=" font-readex font-semibold text-sm text-gray-700">
                {post?.is_hidden ? "شخص مجهول" : post?.creator?.username}
              </h3>

              <p
                style={{ direction: "ltr" }}
                className=" font-inter text-xs text-gray-500 "
              >
                {time ? time : ""}
              </p>
            </div>

            <Image
              src={
                post?.is_hidden
                  ? "/assets/images/unknown.png"
                  : post?.creator?.image
              }
              width={30}
              height={30}
              alt="profileee"
              className="rounded-full  object-contain"
            />
          </div>
        </Link>
      </div>
      <p className="my-4 font-readex text-sm text-gray-700" style={{whiteSpace: "pre-line"}}>{post.content}</p>

    
      <div className="flex mt-2 flex-row justify-between items-center ">
        <p
          onClick={() =>
            handleCategoryClick && handleCategoryClick(post.category)
          }
        >
          {post.category ? (
              <p
              className="font-readex text-xs blue_gradient cursor-pointer "
              onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
              #{post.tag}
            </p>
          ) : null}
        </p>
       
          <LikeButton
            isAuthenticated={session?.user?.id ? true : false}
            OnClick={handleLikeClick}
            likesCount={likesCount}
            isLiked={post?.likes?.some((like) => like == session?.user?.id)}
          />
        
      </div>

      
    </div>
  );
};

export default PostCard;
