import React from 'react'
import PostCard from "./PostCard"
import { useEffect } from 'react'
import LeaderboardPost from './LeaderboardPost'

const LeaderboardList = ({posts, handleTagClick}) => {



  return (
    <div className='mt-8 w-full space-y-6 py-8 sm:columns-1 sm:gap-6 xl:columns-1'>
        {
            posts?.map((post, index) => (
                <LeaderboardPost key={index} post={post} handleTagClick={handleTagClick}/>
            ))
        }
    </div>
  )
}

export default LeaderboardList