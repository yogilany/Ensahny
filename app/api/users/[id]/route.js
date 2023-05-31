import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    console.log("INNNN UUUSSSEERRRR APPPPIIII");

    const user = await User.find({ _id: params.id });
    console.log("INNNN UUUSSSEERRRR APPPPIIII", user);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
};
