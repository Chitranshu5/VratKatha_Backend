import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    subcategory: { type: String  },
    profilePic: { type: String },  // Store the URL of the uploaded profile picture
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
