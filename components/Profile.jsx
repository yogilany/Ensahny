import PostCard from "./PostCard";
import Link from "next/link";

const Profile = ({ name, desc, data, handleEdit, handleDelete, user }) => {
  return (
    <section className='w-full text-right items-end justify-end float-right'>
            <div className="flex justify-end">

      <img  class="rounded w-36 h-36  " src={user.image} alt="Extra large avatar" />
      </div>

      <h1 className='head_text text-right'>
        <span className='orange_gradient'>{name}</span>
        
      </h1>
      
      <div className="flex justify-end">
      <p className=' direc mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl font-readex text-right '>{desc}</p>
  
      </div>
    

<div className="flex justify-end">
<div className='mt-16  w-full space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
  {data.map((post) => (
      <PostCard
      key={post._id}
        post={post}
        handleEdit={() => handleEdit && handleEdit(post)}
        handleDelete={() => handleDelete && handleDelete(post)}
      />
  ))}
</div>
        </div>
    </section>
  );
};

export default Profile;