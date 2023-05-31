import Post from "@models/post";
import { connectToDatabase } from "@utils/database";


export const GET = async (req ,{ params }) => {
    console.log("WWWEEE ARRREE  INGET");

    
        console.log("userId", params.id);


    // get all the posts that this user has liked
    try {
        await connectToDatabase();

        const likedPosts = await Post.find({ likes: params.id }).populate("creator");

        return new Response(JSON.stringify(likedPosts), { status: 200 });
    }
    catch (error) {
            
            return new Response("Error getting liked posts", { status: 500 });
        }
 

   
};



