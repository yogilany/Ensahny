import Post from "@models/post";
import { connectToDatabase } from "@utils/database";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const userId = params.id;
    // console.log("userId", userId);

    const result = await Post.aggregate([
      {
        $match: {
          creator: new ObjectId(userId),
        },
      },
      {
        $project: {
          totalLikes: {
            $size: "$likes",
          },
        },
      },
      {
        $group: {
          _id: userId,
          totalCount: {
            $sum: "$totalLikes",
          },
        },
      },
    ]);
    return new Response(JSON.stringify(result[0].totalCount), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
};
