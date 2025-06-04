const Category = require('../models/categoryModel.js');
const News = require('../models/newsModel.js');


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch categories.',
            error: error.message
        });
    }
};

// Thêm category mới
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();

        res.status(201).json({
            status: 'success',
            message: 'Category created successfully.',
            data: category
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(400).json({
            status: 'error',
            message: 'Failed to create category.',
            error: error.message
        });
    }
};

// Sửa category
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name, description, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Category updated successfully.',
            data: category
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(400).json({
            status: 'error',
            message: 'Failed to update category.',
            error: error.message
        });
    }
};

// Xóa category
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found.'
            });
        }

        // Xóa category khỏi tất cả bài viết liên quan
        await News.updateMany(
            { categories: categoryId },
            { $pull: { categories: categoryId } }
        );

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            status: 'success',
            message: 'Category deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete category.',
            error: error.message
        });
    }
};