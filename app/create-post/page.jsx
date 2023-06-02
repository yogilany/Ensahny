'use client'

import React from 'react'
import { useEffect , useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import Form from "@components/Form"

const CreatePost = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({  content: '', tag: '', is_hidden: false, category:"" })

    const notifySuccess = () => {

        toast.success( "تم إضافة النصيحة بنجاح.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          toastClassName: 'my-custom-toast',
          bodyClassName: ' font-readex rtl_direction text-xs  ',
          autoClose: 3000, // Close the toast after 3 seconds
          theme: "colored"
    
    
        });
    
      };
    
      const notifyError = () => {
    
        toast.error( "حدث خطأ ما. يرجى المحاولة مرة أخرى.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          toastClassName: 'my-custom-toast',
          bodyClassName: ' font-readex rtl_direction text-xs  ',
          autoClose: 3000, // Close the toast after 3 seconds
          theme: "colored"
        });
      }

        
    const createPost = async (e) => { 
        e.preventDefault()
        setSubmitting(true)
        console.log('posttttttttttt', post)

        try{
            const res = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    content: post.content,
                    tag: post.tag,
                    is_hidden: post.is_hidden,
                    userId: null,
                    category: post.tag
                })
            })

            const json = await res.json()
            console.log("res status", res.status)
            if(res.status === 500){
                notifyError();
                throw Error(json.message)
            }
            if(!res.ok){
                notifyError();
                throw Error(json.message)
            }
            else{
                setPost({content: '', tag: '', isHidden: false})
                router.push('/')


            }
            notifySuccess();

        }
        catch(e){
            notifyError();
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