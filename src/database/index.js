import mongoose from "mongoose";

export const connectDB = async () => {
  const mongodbURL = `mongodb+srv://sanketmane:GKrR2XTm5p0UKdTk@cluster101.wugfw.mongodb.net/`;
  mongoose
    .connect(mongodbURL)
    .then(() => console.log("DB connected successfully..."))
    .catch(() => console.log("failed to connect mongodb..."));
};
