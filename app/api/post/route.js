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

        const paramValue = decodeURIComponent(req.url.split('=')[2]);

        console.log("sortParam in API", sortParam);
        console.log("paramValue in API", paramValue);


            const posts = await Post.find( tagParam ?{tag: tagParam} :{$or: [{content: { $regex: param ? param : "", $options: "i" }}, {tag: { $regex: param ? param : "", $options: "i" }}]} ).populate("creator").sort( sortParam ? {[sortParam]: -1, "created_at": -1 }: {"created_at": -1} ).limit( limitParam ? parseInt(limitParam) : 100);

            return new Response(JSON.stringify(posts), {
                status: 200,
        })
    }
    catch (err) {
        console.log("=> error while connecting with database: ", err);
        return new Response(
            JSON.stringify({ message: "Failed to fetch posts" }),
            {
                status: 500,
            }
        );
    }

}