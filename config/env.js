import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI missing in .env");
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("❌ Cloudinary env variables missing");
  }
};

export default loadEnv;
