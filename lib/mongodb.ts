import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const URI: string | undefined = process.env.MONGO_URI;

    if (!URI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }

    await mongoose.connect(URI);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};
