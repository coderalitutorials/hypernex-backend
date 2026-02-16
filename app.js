// import express from "express";
// import authRoutes from "./routes/auth.routes.js";
// import errorMiddleware from "./middlewares/error.middleware.js";
// import categoryRoutes from "./routes/category.routes.js";
// import uploadRoutes from "./routes/upload.routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "API is running 🚀" });
// });

// // Auth routes
// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/uploads", uploadRoutes);
// app.use("/api/blogs", blogRoutes);
// // Global error middleware (LAST me)
// app.use(errorMiddleware);

// export default app;



// import express from "express";
// import cors from "cors"; // 👈 frontend connection ke liye
// import authRoutes from "./routes/auth.routes.js";
// import errorMiddleware from "./middlewares/error.middleware.js";
// import categoryRoutes from "./routes/category.routes.js";
// import uploadRoutes from "./routes/upload.routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// import serviceRoutes from "./routes/service.routes.js"
// import contactRoutes from "./routes/contact.routes.js";
// import emailRoutes from "./routes/email.routes.js"
// import subscriberRoutes from "./routes/subscriberRoutes.js";
// const app = express();

// // ----------------------------
// // MIDDLEWARES
// // ----------------------------

// // JSON body parser
// app.use(express.json());

// // ✅ CORS setup for frontend
// app.use(cors({
//   origin: "http://localhost:5173", // <-- frontend URL (React Vite default)
//   credentials: true,               // agar cookies ya auth headers bhejna ho
// }));

// // ----------------------------
// // ROUTES
// // ----------------------------
// app.get("/", (req, res) => {
//   res.json({ message: "API is running 🚀" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/uploads", uploadRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/offers",serviceRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/email",emailRoutes)
// app.use("/api/subscribers", subscriberRoutes);
// // ----------------------------
// // ERROR HANDLING
// // ----------------------------
// app.use(errorMiddleware);

// export default app;



import express from "express";
import cors from "cors";
import loadEnv from "./config/env.js";
import connectDB from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";

// ----------------------------
// LOAD ENV & SERVICES
// ----------------------------
loadEnv();          // Load environment variables
connectDB();        // Connect to MongoDB
connectCloudinary(); // Configure Cloudinary

// ----------------------------
// EXPRESS APP SETUP
// ----------------------------
const app = express();

// JSON body parser
app.use(express.json());

// CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ----------------------------
// ROUTES
// ----------------------------
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import emailRoutes from "./routes/email.routes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/offers", serviceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/subscribers", subscriberRoutes);

// ----------------------------
// ERROR HANDLING
// ----------------------------
import errorMiddleware from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

export default app;
