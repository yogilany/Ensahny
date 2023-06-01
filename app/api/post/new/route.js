import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { ObjectId } from "mongodb";

export const POST = async (req, res) => {
  const { tag, content, userId, is_hidden, category } = await req.json();

  try {
    connectToDatabase();

    const newPost = new Post({
      creator: userId,
      content,
      tag,
      is_hidden,
      likes: [],
      category
    });

    await newPost.save();

    return new Response(
      JSON.stringify({ message: "Post created successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("=> error while connecting with database: ", err);
    return new Response(
        JSON.stringify({ message: "Failed to create new post" }),
        {
          status: 500,
        }
      );
  }
};
