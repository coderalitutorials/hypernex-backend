import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogBySlug,
} from "../services/blog.service.js";

// ADMIN: Create blog
const createBlogController = async (req, res, next) => {
  try {
    const blog = await createBlog(req.body);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update blog
const updateBlogController = async (req, res, next) => {
  try {
    const blog = await updateBlog(req.params.id, req.body);

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete blog
const deleteBlogController = async (req, res, next) => {
  try {
    await deleteBlog(req.params.id);

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get all blogs (optional category filter)
const getBlogsController = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) filter.categories = category;

    const blogs = await getBlogs(filter);

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get blog by slug
const getBlogBySlugController = async (req, res, next) => {
  try {
    const blog = await getBlogBySlug(req.params.slug);

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogsController,
  getBlogBySlugController,
};
