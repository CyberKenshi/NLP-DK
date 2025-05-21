const Publication = require('../models/publicationModel.js');

// Get publications by userId with pagination
exports.getPublicationsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Giới hạn mặc định là 10
        const skip = (page - 1) * limit;

        const publications = await Publication.find({ owner_id: userId })
            .skip(skip)
            .limit(limit)
            .sort({ publicationDate: -1 }); // Sắp xếp theo ngày giảm dần

        const total = await Publication.countDocuments({ owner_id: userId });
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            status: 'success',
            results: publications.length,
            total: total,
            totalPages: totalPages,
            currentPage: page,
            data: publications
        });
    } catch (error) {
        console.error('Error fetching publications:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch publications.',
            error: error.message
        });
    }
};