import Post from "@models/post";
import { connectToDatabase } from "@utils/database";


export const PATCH = async (request, { params }) => {

    const { userId } = await request.json();

    try {
        await connectToDatabase();

        // check if user has already liked the post
        const existingPost = await Post.findById(params.id);

        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }

        // if user has already liked the post, remove the like
        if (existingPost?.likes?.some(like => like == userId)) {
            existingPost.likes = existingPost.likes.filter(like => like != userId);
            
        } else {

            // if user has not liked the post, add the like
            existingPost.likes.push(userId);
        }

        await existingPost.save();
        


        return new Response("Successfully updated the likes", { status: 200 });
    } catch (error) {

        return new Response("Error Updating likes", { status: 500 });
    }
};

