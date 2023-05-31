"use client";
import PostCard from "./PostCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ myProfile, desc, data, handleEdit, handleDelete, user }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("userData", user);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${user}`);
      const data = await response.json();
      console.log("data", data);

      setUserData(data[0]);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <section className="w-full text-right items-end justify-end float-right">
      {loading ? (
        <div
          role="status"
          className="flex justify-end "
        >
          <div className="flex w-36 h-36 justify-center   items-center rounded-lg border border-gray-300  backdrop-blur-lg backdrop-filter">

         
          <svg
            aria-hidden="true"
            className="inline w-16 h-16  text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <img
            className="rounded w-36 h-36  "
            src={userData.image}
            alt="Extra large avatar"
          />
        </div>
      )}

      <h1 className="head_text text-right">
        <span className="orange_gradient">{myProfile ? "بروفايلي" : userData.username}</span>
      </h1>

      <div className="flex justify-end">
        <p className=" direc mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl font-readex text-right ">
          {desc}
        </p>
      </div>

      <div className="flex justify-end">
        <div className="mt-16  w-full space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
          {data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
