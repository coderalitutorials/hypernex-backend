// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed");
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;



import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ MongoDB already connected");
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI not set in environment variables");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI)
      .then(mongoose => {
        console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
        return mongoose;
      })
      .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
