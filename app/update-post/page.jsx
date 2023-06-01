'use client'

import React from 'react'
import { useEffect , useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter , useSearchParams} from 'next/navigation'

import Form from "@components/Form"

const EditPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const postID = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({  content: '', tag: '', is_hidden: false, category:"", creator: {} })


    useEffect(() => {
        const getPostDetails = async () => {
            const res = await fetch(`/api/post/${postID}`)
            const data = await res.json()
            console.log('dataaaaa 333', data)
            setPost({
                content: data.content,
                tag: data.tag,
                is_hidden: data.is_hidden,
                category: data.category,
                creator: data.creator

                
            })
        }

        if(postID) getPostDetails()
            
    }, [postID])


    useEffect(() => {
        console.log(post)
    }, [post])
        
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    
        if (!postID) return alert("Missing PromptId!");
    
        try {
          const response = await fetch(`/api/post/${postID}`, {
            method: "PATCH",
            body: JSON.stringify({
              content: post.content,
              tag: post.tag,
            }),
          });
    
          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        } finally {
            setSubmitting(false);
        }
      }; 

  return (
    <Form
    type="عدل نصيحتك"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
     />
  )
}

export default EditPost