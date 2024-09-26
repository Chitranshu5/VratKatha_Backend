import express from "express";
import { connectToDatabase } from "./model/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import { User } from "./model/user.model.js";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import { responseHelper } from "./utils/helper.js";
import { Post } from "./model/post.model.js";

const app = express();
configDotenv();
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(cors());

// Port Number
const Port = 9000; // You can use the .process.env.port

// db connection
connectToDatabase();

/************************ Routes****************************/

// Home routes
app.get("/", (req, res) => {
  res.send({
    message: "Successfull running",
    success: true,
  });
});

// createPost for the user

app.post("/createPost", async (req, res) => {
  try {
    const { title, content, category, subcategory } = req.body;

    // Validate the required fields
    if (!title || !content || !category || !subcategory) {
      return responseHelper(res, 404, false, "All fields are required");
    }

    // Create a new post with the provided data
    const post = new Post({
      title,
      content,
      category,
      subcategory,
    });

    // Save the post to the database
    await post.save();

    // Respond with success
    responseHelper(res, 201, true, "Post created successfully", { data: post });
  } catch (error) {
    console.error("Error creating post:", error.message);
    responseHelper(res, 500, false, "Server error");
  }
});

app.get("/getPost/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);

    // Find the post by ID in the database
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return responseHelper(res, 404, false, "Post not found");
    }

    console.log(post);
    // Respond with the post data
    responseHelper(res, 200, true, "Post fetched successfully", { data: post });
  } catch (error) {
    console.error("Error fetching post:", error.message);
    responseHelper(res, 500, false, "Server error");
  }
});


app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts but only select title and _id (postId)
    const posts = await Post.find({}, 'title _id'); // Select only title and _id

    // Respond with the fetched posts
    responseHelper(res, 200, true, "Posts fetched successfully", { data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    responseHelper(res, 500, false, "Server error");
  }
});







// Helper function to validate ObjectId format (for MongoDB)
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}


// Get a single post by a user

app.get("/chinu", (req, res) => {
  res.send({
    message: "Hello Chinu",
  });
});
// logout
app.get("/log", (req, res) => {
  try {
    res.clearCookie("Chinu");
    res.clearCookie("token");
    res.status(200).send({
      message: "Coolkies are resent carefully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

// Port Working
app.listen(process.env.port, () => {
  console.log(`Running on the `);
  // console.log(process.env.port);
});
