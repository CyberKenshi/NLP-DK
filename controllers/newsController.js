const News = require('../models/newsModel.js');
const cloudinary = require('../utils/cloudinary.js');

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const owner_id = req.user.id;
        let imageUrl = null;

        // Upload ảnh nếu có
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'news',
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            });
            imageUrl = uploadResult.secure_url;
        }

        const news = new News({
            title,
            content,
            imageUrl,
            owner_id,
        });

        await news.save();

        res.status(201).json({
            status: 'success',
            message: 'News created successfully.',
            data: news
        });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create news.',
            error: error.message
        });
    }
};