const News = require('../models/newsModel.js');
const Category = require('../models/categoryModel.js');

// exports.getAllNews = async (req, res) => {
//     try {
//         const { page = 1, search = '', orderby = 'newest' } = req.query;
//         const limit = 5;
//         const skip = (page - 1) * limit;

//         let query = {};
//         if (search) {
//             query = {
//                 $or: [
//                     { title: { $regex: search, $options: 'i' } },
//                     { content: { $regex: search, $options: 'i' } }
//                 ]
//             };
//         }

//         const sort = orderby === 'newest' ? { createdAt: -1 } : { createdAt: 1 };

//         console.log('Query:', query);
//         console.log('Sort:', sort);
//         console.log('Page:', page, 'Skip:', skip, 'Limit:', limit);

//         const news = await News.find(query)
//             .populate('categories')
//             .sort(sort)
//             .skip(skip)
//             .limit(limit);

//         console.log('Fetched news:', news);

//         const totalNews = await News.countDocuments(query);
//         const totalPages = Math.ceil(totalNews / limit);

//         console.log('Total news:', totalNews, 'Total pages:', totalPages);

//         if (req.path.includes('/api/')) {
//             res.status(200).json({
//                 status: 'success',
//                 data: news,
//                 currentPage: parseInt(page),
//                 totalPages
//             });
//         } else {
//             res.render('news', {
//                 news,
//                 currentPage: parseInt(page),
//                 totalPages,
//                 search,
//                 orderby
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching news:', error);
//         if (req.path.includes('/api/')) {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Failed to fetch news.',
//                 error: error.message
//             });
//         } else {
//             res.render('news', {
//                 news: [],
//                 currentPage: 1,
//                 totalPages: 0,
//                 search: '',
//                 orderby: 'newest',
//                 error: error.message
//             });
//         }
//     }
// };

// Grok
exports.getAllNews = async (req, res) => {
    try {
        // Query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const orderby = req.query.orderby || 'newest';
        const category = req.query.category || '';
        // Build query
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        };
        if (category) {
            query.categories = category; // Filter by category ID
        }
        // Sorting
        const sort = orderby === 'newest' ? { createdAt: -1 } : { createdAt: 1 };

        // console.log(`Query: ${JSON.stringify(query)}`);
        // console.log(`Sort: ${JSON.stringify(sort)}`);
        // console.log(`Page: ${page} Skip: ${skip} Limit: ${limit}`);

        // Fetch news
        const news = await News.find(query)
            .populate('categories')
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalNews = await News.countDocuments(query);
        const totalPages = Math.ceil(totalNews / limit) || 1; // Ensure at least 1 page

        // console.log(`Fetched news: ${JSON.stringify(news)}`);
        // console.log(`Total news: ${totalNews} Total pages: ${totalPages}`);

        // Check if the request is AJAX
        const isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';

        if (isAjax) {
            // Respond with JSON for AJAX requests
            res.json({
                news: news || [], 
                currentPage: page,
                totalPages: totalPages,
                search: search,
                orderby: orderby,
                locale: req.getLocale()
            });
        } else {
            // Render the page for initial load
            res.render('news', {
                news: news || [],
                currentPage: page,
                totalPages: totalPages,
                search: search,
                orderby: orderby,
                locale: req.getLocale(),
                __: res.__
            });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            res.status(500).json({
                error: 'Internal server error',
                news: [],
                currentPage: 1,
                totalPages: 1,
                search: '',
                orderby: 'newest',
                locale: req.getLocale()
            });
        } else {
            res.status(500).render('500', {
                locale: req.getLocale(),
                __: res.__,
                error: __('news.internal_error') || 'Internal server error'
            });
        }
    }
};

exports.getNews = async (req, res) => {
    try {
        const newsId = req.params.id;
        const news = await News.findById(newsId).populate('categories');
        const allCategories = await Category.find().sort({ createdAt: -1 }).lean();
        if (!news) {
            return res.status(404).render('404', {
                locale: req.getLocale(),
                __: res.__,
                error: __('news.not_found') || 'News not found'
            });
        }
        // console.log(`Fetched news: ${JSON.stringify(news)}`);
        res.render('news-detail', {
            news,
            allCategories,
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).render('500', {
            locale: req.getLocale(),
            __: res.__,
            error: __('news.internal_error') || 'Internal server error'
        });
    }
};

exports.getNewsDetail = async (req, res) => {
    try {
        const newsId = req.params.id;
        const news = await News.findById(newsId).populate('categories').lean();
        if (!news) {
            return res.status(404).render('404', {
                locale: req.getLocale(),
                __: res.__,
                message: 'News article not found.'
            });
        }

        const allCategories = await Category.find().sort({ createdAt: -1 }).lean();

        res.render('news-detail', {
            news,
            allCategories, 
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        console.error('Error fetching news detail:', error);
        res.status(500).render('500', {
            locale: req.getLocale(),
            __: res.__,
            message: 'Failed to fetch news details.'
        });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        let thumbnail = null;

        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`;
        }

        const parsedCategoryIds = Array.isArray(categoryIds) ? categoryIds : [];

        const news = new News({
            title,
            content,
            categories: parsedCategoryIds,
            thumbnail,
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

exports.updateNews = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({
                status: 'error',
                message: 'News not found.'
            });
        }

        news.title = title || news.title;
        news.content = content || news.content;
        news.categories = Array.isArray(categoryIds) ? categoryIds : news.categories;

        if (req.file) {
            news.thumbnail = `/uploads/${req.file.filename}`;
        }

        await news.save();

        res.status(200).json({
            status: 'success',
            message: 'News updated successfully.',
            data: news
        });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update news.',
            error: error.message
        });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({
                status: 'error',
                message: 'News not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'News deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete news.',
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