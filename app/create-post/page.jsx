'use client'

import React from 'react'
import { useEffect , useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from "@components/Form"

const CreatePost = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({  content: '', tag: '', is_hidden: false, category:"" })


        
    const createPost = async (e) => { 
        e.preventDefault()
        setSubmitting(true)
        // console.log('post', post)

        try{
            const res = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    content: post.content,
                    tag: post.tag,
                    is_hidden: post.is_hidden,
                    userId: session?.user.id,
                    category: post.category
                })
            })

            const json = await res.json()
            if(!res.ok){
                throw Error(json.message)
            }
            else{
                setPost({content: '', tag: '', isHidden: false})
                router.push('/')


            }
        }
        catch(e){
            throw Error(e.message)
        }
        finally{
            setSubmitting(false)
        }



      }   

  return (
    <Form
    type="أضف نصيحة جديدة"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}
     />
  )
}

export default CreatePost