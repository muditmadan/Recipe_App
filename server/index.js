import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());

// Configure CORS with origin from .env
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('DB Connection Successful');
})
.catch((err) => {
  console.error('DB Connection Error:', err);
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
