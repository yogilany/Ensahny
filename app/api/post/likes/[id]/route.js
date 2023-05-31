import Post from "@models/post";
import { connectToDatabase } from "@utils/database";


export const GET = async (req ,{ params }) => {

    
    try {
        await connectToDatabase();

        const likedPosts = await Post.find({ likes: params.id }).populate("creator");

        return new Response(JSON.stringify(likedPosts), { status: 200 });
    }
    catch (error) {
            
            return new Response("Error getting liked posts", { status: 500 });
        }
 

   
};



