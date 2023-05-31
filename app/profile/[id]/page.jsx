"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log('otherUser', otherUser)
  console.log('params', params)




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
    session && <Profile
      myProfile={params.id == session?.user.id   ? true : false}
      desc='آهلاً بيك في بروفايلك الشخصي. هنا هتلاقي كل نصايحك السابقة واللي ممكن تعدلها أو تحذفها.'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      user={params.id || session?.user.id}
    />
  );
};

export default MyProfile;