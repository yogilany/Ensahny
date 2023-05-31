'use client'
import PostCardList from "@components/PostCardList"
import {useState, useEffect} from 'react'
import { useSession } from "next-auth/react";

const Favouraites = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([])




    useEffect(() => {
        const userId = session?.user?.id
        const fetchPosts = async () => {
            const res = await fetch(`/api/post/likes/${userId}`)
            const data = await res.json();
            setPosts(data)            
        }
        fetchPosts();
        console.log('Feed mounted')


    }, [session])

  return (
    <section className='mt-8 mx-auto w-full max-w-5xl flex justify-center items-center flex-col gap-2'>
 <h1 className=" underline underline-offset-3 decoration-8 decoration-orange-600  h-20 mt-5 text-5xl font-extrabold leading-[1.15]  sm:text-6xl font-readex text-black   text-center   ">نصايحي المفضلة   
        </h1>
<PostCardList
        posts={posts}
        handleTagClick={(e) => {
          
        }}
        />
        </section>
  )
}

export default Favouraites