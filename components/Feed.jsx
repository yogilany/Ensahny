'use client'

import {useState, useEffect} from 'react'
import PostCardList from './PostCardList'

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [tagClicked, setTagClicked] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [tagQuery, setTagQuery] = useState('')




    function handleSearchChange(e){
        e.preventDefault()
        setSearchQuery(e.target.value)
        // setFilteredPosts(posts.filter(post => post.content.includes(e.target.value) || post.tag.includes(e.target.value)))
    }



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/post?param=${searchQuery}&tag=${tagQuery}`)
            const data = await res.json()
            console.log("data",data)
            setPosts(data)            
        }
        fetchPosts();
        console.log('Feed mounted')


    }, [searchQuery, tagQuery])

  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input 
            type="text"
            placeholder="Search"
            className="search_input peer"
            required
            onChange={handleSearchChange}

            />

        </form>

        <PostCardList 
        posts={posts}
        handleTagClick={(e) => {
            if(tagClicked){
                setTagQuery('')
                setTagClicked(false)
                return
            }
            setTagQuery(e)
            setTagClicked(true);
        }}
        />

    </section>
  )
}

export default Feed