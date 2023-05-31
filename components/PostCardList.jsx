import React from 'react'
import PostCard from "./PostCard"
import { useEffect } from 'react'

const PostCardList = ({posts, handleTagClick}) => {



  return (
    <div className='mt-16 prompt_layout'>
        {
            posts?.map((post, index) => (
                <PostCard key={index} post={post} handleTagClick={handleTagClick}/>
            ))
        }
    </div>
  )
}

export default PostCardList