import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { useSearchParams } from "next/navigation";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    // get a paramter sent in the url called ID
    const params = new URL(req.url).searchParams;
    const param = params.get("param");
    const tagParam = params.get("tag");
    const sortParam = params.get("sort");
    const limitParam = params.get("limit");
    const categoryParam = params.get("category");

    console.log("param", param);
    console.log("tagParam", tagParam);
    console.log("sortParam", sortParam);
    console.log("limitParam", limitParam);
    console.log("categoryParam", categoryParam);



    // get the posts. if the post was is hidden, don't populate the creator else populate the creator
    const posts = await Post.find(
        categoryParam ? { category: categoryParam }:
        tagParam ? { tag: { $regex: tagParam, $options: "i" } } :
{
        $or: [
            { category: { $regex: categoryParam, $options: "i" } },
            { content: { $regex: param, $options: "i" } },
            { tag: { $regex: tagParam, $options: "i" } },

        ],
        is_hidden: false,
    })
        .populate("creator")
        .sort(
            sortParam ? { [sortParam]: -1, created_at: -1 } : { created_at: -1 }
          )
          .limit(limitParam ? parseInt(limitParam) : 100);

        // add the posts that are hidden put not the creator. don't return the creator
    const hiddenPosts = await Post.find({
        category: categoryParam ? categoryParam : { $exists: true || false },

        $or: [
            { content: { $regex: param, $options: "i" } },
            { tag: { $regex: tagParam, $options: "i" } },
        ],
        is_hidden: true,
    })
    .select("-creator")
    .sort(
        sortParam ? { [sortParam]: -1, created_at: -1 } : { created_at: -1 }
      )
      .limit(limitParam ? parseInt(limitParam) : 100);

    // add the hidden posts to the posts array
    posts.push(...hiddenPosts);
    // sort the posts by date
    posts.sort((a, b) => b.created_at - a.created_at);
    

   

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (err) {
    console.log("=> error while connecting with database: ", err);
    return new Response(JSON.stringify({ message: "Failed to fetch posts" }), {
      status: 500,
    });
  }
};
