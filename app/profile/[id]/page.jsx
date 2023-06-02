"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Link  from "next/link";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log('otherUser', otherUser)
  // console.log('params', params)




  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    params.id != "null" ?
    session && <Profile
      myProfile={params.id == session?.user.id   ? true : false}
      desc={params.id == session?.user.id  ? 'أهلاً بيك في بروفايلك الشخصي. هنا هتلاقي كل نصايحك السابقة واللي ممكن تعدلها أو تحذفها.' : null }
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      user={params.id || session?.user.id}
    />
    : <section className=" ">
    <div className="items-center flex flex-col pb-12">
    <svg className="mx-auto mb-4 w-16 h-16 text-gray-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path fill="currentColor" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
</svg>
        <h1 className="mb-4 text-4xl font-bold font-readex tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl text-center ">صاحب هذه النصيحة مجهول</h1>
        <p className="mb-4 font-light text-gray-500 md:text-lg xl:text-xl font-readex text-center">طلب صاحب هذه النصيحة أن تكون نصيحته مجهولة المصدر<div className=""></div></p>
        <Link href="/" className="mt-4 outline_btn font-readex">
    عودة للصفحة الرئيسية
    </Link>
    </div>
</section>
  );
};

export default MyProfile;