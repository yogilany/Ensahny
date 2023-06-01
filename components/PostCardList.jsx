import React from 'react'
import PostCard from "./PostCard"
import { useEffect } from 'react'

const PostCardList = ({posts, handleTagClick, handleCategoryClick}) => {



  return (
    <div className='mt-4  w-full space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
        {
            posts?.map((post, index) => (
                <PostCard key={index} post={post} handleTagClick={handleTagClick}  handleCategoryClick={handleCategoryClick}/>
            ))
        }
    </div>
  )
}

export default PostCardList