import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { useSearchParams } from "next/navigation";


export const GET = async (req, res) => {
    try {
      await connectToDatabase();
  
   const posts = await Post.aggregate([
    {
      $project: {
        _id: 1,
        likesCount: { $size: '$likes' },
        
      }
    },
    { $unwind: '$likesCount' },
    { $sort: { likesCount: -1 } },
    {
      $group: {
        _id: '$_id',
        likesCount: { $first: '$likesCount' }
      }
    },
    { $sort: { likesCount: -1 } },
    {
      $lookup: {
        from: 'posts', // The name of the collection
        localField: '_id',
        foreignField: '_id',
        as: 'post'
      }
    },
    { $unwind: '$post' },
    // get the creator data from the creator id
    {
        $lookup: {
            from: "users", // The name of the collection
            localField: "post.creator", // Find post where `localField`
            foreignField: "_id", // is equal to `foreignField`
            as: "post.creator", // Put that data in `creator`
        },
    },
    { $unwind: '$post.creator' },
    {
        $project: {
            _id: '$post._id',
            content: '$post.content',
            creator: '$post.creator',
            likes: '$post.likes',   
            created_at: '$post.created_at',
            updated_at: '$post.updated_at',
            is_hidden: '$post.is_hidden',
            category: '$post.category',
            tag: '$post.tag',
            likesCount: 1
        }
    },
    { $sort: { likesCount: -1 } },

    
  ])
    .limit(10)
    
    
        console.log("posts", posts);

   
      return new Response(JSON.stringify(posts), {
        status: 200,
      });

    } catch (err) {
      console.log("=> error while connecting with database: ", err);
      return new Response(
        JSON.stringify({ message: "Failed to fetch posts" }),
        {
          status: 500,
        }
      );
    }
  
};
