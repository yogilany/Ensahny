"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LikeButton from "@components/LikeButton";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const likesCount = post?.likes.length;
//   console.log("likesCount", post?.likes.length)


  const [copied, setCopied] = useState("");

  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(false), 3000);
  };



  function handleLikeClick(){
    // e.preventDefault()/
 
    // get the user id
    const userId = session?.user.id
    // get the post id
    const postId = post._id
    // if the user has liked the post, remove the like using mongoose
    try{
        const res = fetch(`/api/post/like/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            userId: userId,
        })
        })

        if(res.ok){
            console.log("Like added")
        }
    }
    catch(e){
        console.log("Opps! Something went wrong")
    
        console.log(e.message)
        throw Error(e.message)
    }



}

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-0.5">
        <div className="flex flex-1 justify-start items-start gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi font-semibold text-gray-900">
              {post?.creator.username}
            </h3>
            <p className=" font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
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
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.content}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
     
     
<LikeButton isAuthenticated={ session?.user?.id ? true : false} OnClick={handleLikeClick}  likesCount={likesCount} isLiked={post?.likes?.some(like => like == session?.user?.id)}/>

      {
      
      
      session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className=" flex-center gap-4 border-t border-gray-100 pt-3">
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

export default PostCard;
