import PostCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full text-right items-end justify-start'>
      <h1 className='head_text text-right'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <div className="flex justify-end">
      <p className=' direc mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl font-readex text-right '>{desc}</p>

      </div>
<div className="flex justify-end">
<div className='mt-10 space-y-6 py-8 flex flex-wrap'>
  {data.map((post) => (
    <div className='w-full sm:w-1/2 xl:w-1/3' key={post._id}>
      <PostCard
        post={post}
        handleEdit={() => handleEdit && handleEdit(post)}
        handleDelete={() => handleDelete && handleDelete(post)}
      />
    </div>
  ))}
</div>
        </div>
    </section>
  );
};

export default Profile;