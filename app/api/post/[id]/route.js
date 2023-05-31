import Post from "@models/post";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase()

        const prompt = await Post.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { content, tag } = await request.json();

    try {
        await connectToDatabase();

        // Find the existing prompt by ID
        const existingPrompt = await Post.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.content = content;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the posts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Find the prompt by ID and remove it
        await Post.findByIdAndRemove(params.id);

        return new Response("Posts deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting post", { status: 500 });
    }
};