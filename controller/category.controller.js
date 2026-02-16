import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../services/category.service.js";

// ADMIN: Create category
const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update category
const updateCategoryController = async (req, res, next) => {
  try {
    const category = await updateCategory(req.params.id, req.body);

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete category
const deleteCategoryController = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get categories
const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoriesController,
};
