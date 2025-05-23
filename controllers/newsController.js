const News = require('../models/newsModel.js');

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = null;

        // Lưu URL của ảnh nếu có (từ input file)
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`; // URL cục bộ
        }

        const news = new News({
            title,
            content,
            imageUrl,
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

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded.'
            });
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        // CKEditor 4 yêu cầu response dạng { uploaded: 1, url: "..." }
        res.status(200).json({
            uploaded: 1,
            fileName: req.file.originalname,
            url: imageUrl
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({
            uploaded: 0,
            error: {
                message: error.message
            }
        });
    }
};