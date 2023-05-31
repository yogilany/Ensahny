'use client'
import LeaderboardList from "@components/LeaderboardList"
import {useState, useEffect} from 'react'

const Leaderboard = () => {

    const [posts, setPosts] = useState([])



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/post?sort=likes&limit=10`)
            const data = await res.json()
            console.log(data)
            setPosts(data)            
        }
        fetchPosts();
        console.log('Feed mounted')


    }, [])

  return (
    <section className='mt-8 mx-auto w-full max-w-4xl flex justify-center items-center flex-col gap-2'>
 <h1 className="head_text text-center font-readex font-bold ">Leaderboard  
        </h1>
<LeaderboardList
        posts={posts}
        handleTagClick={(e) => {
          
        }}
        />
        </section>
  )
}

export default Leaderboard