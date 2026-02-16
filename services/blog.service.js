import Blog from "../model/blog.model.js";
import slugify from "slugify";
import Subscriber from "../model/Subscriber.js";
import { sendBulkEmail } from "./emailService.js";
// Helper: calculate read time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(" ").length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};

// Create Blog
// const createBlog = async (data) => {
//   const { title, content, excerpt, categories, author, blogImage, status } = data;

//   const slug = slugify(title, { lower: true, strict: true });
//   const readTime = calculateReadTime(content);

//   const blog = await Blog.create({
//     title,
//     slug,
//     excerpt,
//     content,
//     categories,
//     author,
//     blogImage,
//     readTime,
//     status,
//   });

//   return blog;
// };


const createBlog = async (data) => {
  const { title, content, excerpt, categories, author, blogImage, status } = data;

  const slug = slugify(title, { lower: true, strict: true });
  const readTime = calculateReadTime(content);

  const blog = await Blog.create({
    title,
    slug,
    excerpt,
    content,
    categories,
    author,
    blogImage,
    readTime,
    status,
  });

  // 🔥 SEND EMAIL TO SUBSCRIBERS IF BLOG IS PUBLISHED
  if (status === "published") {
    const subscribers = await Subscriber.find({}, "email");
    const emails = subscribers.map((sub) => sub.email);

    await sendBulkEmail({
      emails,
      subject: `🆕 New Blog: ${title}`,
      html: `
        <h2>${title}</h2>
        <p>${excerpt}</p>
        <p><a href="${process.env.FRONTEND_URL}/blog/${slug}">
          Read Full Blog →
        </a></p>
      `,
    });
  }

  return blog;
};









// Update Blog
const updateBlog = async (id, data) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");

  blog.title = data.title || blog.title;
  blog.slug = data.title ? slugify(data.title, { lower: true, strict: true }) : blog.slug;
  blog.excerpt = data.excerpt || blog.excerpt;
  blog.content = data.content || blog.content;
  blog.categories = data.categories || blog.categories;
  blog.blogImage = data.blogImage || blog.blogImage;
  blog.author = data.author || blog.author;
  blog.status = data.status || blog.status;
  blog.readTime = data.content ? calculateReadTime(data.content) : blog.readTime;
  blog.publishDate = data.publishDate || blog.publishDate;

  await blog.save();
  return blog;
};

// Delete Blog
const deleteBlog = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  await blog.deleteOne();
  return true;
};

// Get all blogs (with filter & populate)
const getBlogs = async (filter = {}) => {
  const blogs = await Blog.find(filter)
    .populate("categories", "name slug")
    .sort({ publishDate: -1 });
  return blogs;
};

// Get single blog by slug
const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug })
    .populate("categories", "name slug");

  if (!blog) throw new Error("Blog not found");
  return blog;
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogBySlug,
};
