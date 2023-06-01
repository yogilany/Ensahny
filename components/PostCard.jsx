"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LikeButton from "@components/LikeButton";
import Link from "next/link";
import Dropdown from "./Dropdown";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete, handleCategoryClick }) => {
  const likesCount = post?.likes.length;

  const [time, setTime] = useState("")

  const [copied, setCopied] = useState("");

  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(false), 3000);
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
    
    const elapsedTime = Math.floor((now - date) / 1000); // Calculate elapsed time in seconds
    
    if (elapsedTime < 60) {
      // Less than a minute
      setTime(elapsedTime + " seconds ago");
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
      {
        session?.user.id === post?.creator?._id   && pathName === `/profile/${post?.creator?._id}` ?
        <Dropdown handleDelete={handleDelete} handleEdit={handleEdit} handleCopy={handleCopy} />
:
        <div className="copy_btn" onClick={handleCopy}>
          <button         className="text-gray-400 border border-gray-400 hover:bg-gray-300 hover:text-white active:bg-gray-400 active:outline-none active:text-white  font-medium rounded-lg text-xs  p-1 text-center inline-flex items-center mr-2  "


          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clip-rule="evenodd" fill-rule="evenodd" d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0114.75 19h-9.5A2.25 2.25 0 013 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 019 1h2c1.373 0 2.531.923 2.887 2.182zM7.5 4A1.5 1.5 0 019 2.5h2A1.5 1.5 0 0112.5 4v.5h-5V4z"></path>
</svg>
            </button>
        </div>
}
        



        <Link href={post?.creator? `/profile/${post?.creator?._id}` : `/profile/${null}`} >

        <div className="flex flex-1 justify-end items-center gap-3 cursor-pointer">
          <div className="flex flex-col  ">
            <h3 className=" font-readex font-semibold text-sm text-gray-700">
              {post?.is_hidden ? "شخص مجهول" : post?.creator?.username}
            </h3>
            
            <p style={{direction: "ltr"}} className=" font-inter text-xs text-gray-500 ">
              {time? time : ""}
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
      <p className="my-4 font-readex text-sm text-gray-700">{post.content}</p>
     
      <p
        className="font-readex text-xs blue_gradient cursor-pointer "
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      <div className="flex mt-2 flex-row justify-between items-center ">
   
      <p
              onClick={() => handleCategoryClick && handleCategoryClick(post.category)}

      >
      {post.category? <span className=" cursor-pointer font-readex bg-gray-200 text-gray-800   text-[0.7rem] font-normal mr-2 px-2.5 py-0.5 rounded-full ">{post.category}</span> : null}
      </p>
        {session && <LikeButton
          isAuthenticated={session?.user?.id ? true : false}
          OnClick={handleLikeClick}
          likesCount={likesCount}
          isLiked={post?.likes?.some((like) => like == session?.user?.id)}
        /> }
        
      </div>
    

      {session?.user.id === post?.creator?._id   && pathName === `/profile/${post?.creator?._id}` && (
        <div className=" flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-readex text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            تعديل
          </p>
          <p
            className="font-readex text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            إزالة
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
