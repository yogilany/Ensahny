"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LikeButton from "@components/LikeButton";
import Link from "next/link";

const LeaderboardPost = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const likesCount = post?.likes.length;

  const [copied, setCopied] = useState("");
  const [time, setTime] = useState("")

  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(false), 3000);
  };

  function handleLikeClick() {
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
    <div className=" text-center items-end flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter w-full h-fit">
            <Link href={post?.creator? `/profile/${post?.creator?._id}` : `/profile/${null}`} >

      <div className="flex justify-between items-center gap-0.5">

        <div className="flex flex-1 flex-col justify-center items-center gap-3 cursor-pointer">
          <Image
src={
  post?.is_hidden
    ? "/assets/images/unknown.png"
    : post?.creator?.image
}            width={30}
            height={30}
            alt="profile"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className=" font-readex font-semibold text-sm  text-gray-900">
            {post?.is_hidden ? "شخص مجهول" : post?.creator.username}
            </h3>
            <p style={{direction: "ltr"}} className=" font-inter text-xs text-gray-500 ">
              {time? time : ""}
            </p>
            {/* <p className=" font-inter text-xs text-gray-500">
              {post?.creator.email}
            </p> */}
          </div>
        </div>
      </div>
      </Link>

      <p className="my-4 font-readex text-center text-md text-gray-700">
        {post.content}
      </p>
      <p
        className="font-readex text-xs blue_gradient cursor-pointer text-center"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      <div className="flex flex-row items-center justify-between ">
        <div className="copy_btn mx-4" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
        <LikeButton
          isAuthenticated={session?.user?.id ? true : false}
          OnClick={handleLikeClick}
          likesCount={likesCount}
          isLiked={post?.likes?.some((like) => like == session?.user?.id)}
        />
      </div>

      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPost;
