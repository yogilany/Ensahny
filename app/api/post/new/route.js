import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { ObjectId } from "mongodb";

export const POST = async (req, res) => {
  const { tag, content, userId, is_hidden } = await req.json();
  console.log("tag in API", tag);
    console.log("content in API", content);
    console.log("userId in API", userId);
    console.log("is_hidden in API", is_hidden);


  try {
    connectToDatabase();

    const newPost = new Post({
      creator: userId,
      content,
      tag,
      is_hidden,
      likes: [],
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
