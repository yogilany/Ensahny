import React from 'react'
import PostCard from "./PostCard"
import { useEffect } from 'react'

const PostCardList = ({posts, handleTagClick}) => {



  return (
    <div className='mt-16 w-full max-w-4xl space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-'>
        {
            posts?.map((post, index) => (
                <PostCard key={index} post={post} handleTagClick={handleTagClick}/>
            ))
        }
    </div>
  )
}

export default PostCardList