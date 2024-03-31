import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRouter from "./routes/GenerateImage.js";
import postRouter from "./routes/Posts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/generateImage/", generateImageRouter);
app.use("/api/post/", postRouter);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

connectDB();

// Define a schema for the image
const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

// Define a model for the image
const Image = mongoose.model("Image", imageSchema);

// Controller to generate and store image
app.post("/api/generateImage", async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Your code to generate the image here
    const generatedImage = generateImageFunction(prompt);

    // Convert image to binary data
    const imageData = Buffer.from(generatedImage, "base64");

    // Create a new image document
    const newImage = new Image({
      data: imageData,
      contentType: "image/png", // Adjust content type as needed
    });

    // Save the image document to MongoDB
    await newImage.save();

    res.status(200).json({ message: "Image saved successfully" });
  } catch (error) {
    next(error);
  }
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import generateImageRouter from "./routes/GenerateImage.js";
// import postRouter from "./routes/Posts.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true })); // for form data

// app.use("/api/generateImage/", generateImageRouter);
// app.use("/api/post/", postRouter);

// // error handler
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });

// app.get("/", async (req, res) => {
//   res.status(200).json({
//     message: "Hello developers from GFG",
//   });
// });

// // Connecting mongodb to server
// const connectDB = () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log("MongoDB connected sunccessfully"))
//     .catch((err) => {
//       console.log("Failed to connect to DB");
//       console.log(err);
//     });
// };

// const startServer = async () => {
//   try {
//     connectDB();
//     app.listen(8080, () => console.log("Server started on port 8080"));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();
