'use client'
import LeaderboardList from "@components/LeaderboardList"
import {useState, useEffect} from 'react'

const Leaderboard = () => {

    const [posts, setPosts] = useState([])



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/post?sort=likes&limit=10`)
            const data = await res.json()
            // console.log(data)
            setPosts(data)            
        }
        fetchPosts();
        console.log('Feed mounted')


    }, [])

  return (
    <section className='mt-8 mx-auto w-full max-w-4xl flex justify-center items-center flex-col gap-2 '>
 <h1 className="mb-8 underline underline-offset-3 decoration-8 decoration-orange-600  h-20 mt-5 text-5xl font-extrabold leading-[1.15]  sm:text-6xl font-readex text-black   text-center   ">زاوية النصائح القيِّمة   
        </h1>
        <p className="text-center desc font-readex font-light "> 
هنا هتلاقي أكثر ١٠ نصائح تم تفضيلها من الناس. اقراها وشاركها مع أصحابك عشان تفيد أكبر عدد ممكن من الناس.





        </p>
<LeaderboardList
        posts={posts}
        handleTagClick={(e) => {
          
        }}
        />
        </section>
  )
}

export default Leaderboard