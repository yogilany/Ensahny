import mongoose, {Schema, model, models} from "mongoose";
const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    },
    likes:  {
        type: Schema.Types.Array,
        ref: "User",

    }, 
    is_hidden:  {
        type: Boolean,
        default: false,
    } ,
    created_at: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },


});

const Post = models.Post || model("Post", PostSchema);

export default Post;