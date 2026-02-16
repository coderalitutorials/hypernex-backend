import Category from "../model/category.model.js";

// Create Category
const createCategory = async ({ name, slug }) => {
  const exists = await Category.findOne({ slug });

  if (exists) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name, slug });
  return category;
};

// Update Category
const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  category.name = data.name || category.name;
  category.slug = data.slug || category.slug;

  await category.save();
  return category;
};

// Delete Category
const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  await category.deleteOne();
  return true;
};

// Get All Categories (Public)
const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
