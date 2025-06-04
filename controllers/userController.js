const User = require('../models/usersModel.js');
const Publication = require('../models/publicationModel.js');
const mongoose = require('mongoose');

// Get all personnel users
const getAllPersonnelUsers = async (req, res) => {
    try {
        const personnelUsers = await User.find({ role: 'personnel' });
        res.status(200).json({
            status: 'success',
            results: personnelUsers.length,
            data: personnelUsers
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch personnel users.',
            error: error.message
        });
    }
};

// Get all intern users without pagination
const getAllInternUsers = async (req, res) => {
    try {
        const internUser = await User.find({ role: 'intern' });
        res.status(200).json({
            status: 'success',
            results: internUser.length,
            data: internUser
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch intern users.',
            error: error.message
        });
    }
};

// Get details of a specific user by userId
const getUserDetail = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user details.',
            error: error.message
        });
    }
};

const addUser = async (req, res) => {
    try {
        // Nếu có file được upload, thêm đường dẫn file vào avatar
        if (req.file) {
            req.body.avatar = `/uploads/avatar/${req.file.filename}`;
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'User added successfully.',
            data: newUser
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add user.',
            error: error.message
        });
    }
};

// Update user details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update user.',
            error: error.message
        });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete user.',
            error: error.message
        });
    }
};

// Get user field options for dropdowns
const getUserFieldOptions = async (req, res) => {
    try {
        const roles = User.schema.path('role').enumValues;
        const degreeVi = User.schema.path('degree.vi').enumValues;
        const degreeEn = User.schema.path('degree.en').enumValues;

        // Danh sách job titles mẫu
        const jobTitles = [
            { vi: 'Trưởng Khoa', en: 'Dean' },
            { vi: 'Phó Trưởng Khoa', en: 'Vice Dean' },
            { vi: 'Thực tập sinh', en: 'Intern' },
            { vi: 'Cộng tác viên', en: 'Collaborator' }
        ];

        res.status(200).json({
            status: 'success',
            data: {
                roles,
                degrees: {
                    vi: degreeVi,
                    en: degreeEn
                },
                jobTitles
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch field options.',
            error: error.message
        });
    }
};
// Get personnel users for rendering personnel page
const getPersonnelForPage = async (req, res) => {
    try {
        const personnel = await User.find({
            role: { $in: ['personnel', 'colab'] },
            isLocked: false,
        })
            .select('fullName bio avatar _id role jobTitles degree roleInLab')
            .lean();

        res.render('personnel', {
            personnel,
            locale: req.getLocale(),
            __: res.__,
            error: personnel.length === 0 ? 'No personnel users found' : null,
        });
    } catch (error) {
        console.error('Error fetching personnel users:', error);
        res.status(500).render('500', {
            locale: req.getLocale(),
            __: res.__,
        });
    }
};
const getPersonnelDetail = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).render('404', { locale: req.getLocale(), __: res.__, message: 'Invalid user ID.' });
        }

        const user = await User.findOne({
            _id: userId,
            role: { $in: ['personnel', 'colab'] },
            isLocked: false
        }).lean();

        if (!user) {
            return res.status(404).render('404', { locale: req.getLocale(), __: res.__, message: 'Personnel not found.' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || null;
        const order = req.query.order || 'desc';

        let sortCriteria = { publicationYear: -1, citationCount: -1 };
        if (sortBy) {
            if (sortBy === 'year') {
                sortCriteria = { publicationYear: order === 'asc' ? 1 : -1 };
            } else if (sortBy === 'citation') {
                sortCriteria = { citationCount: order === 'asc' ? 1 : -1 };
            }
        }

        const totalPublications = await Publication.countDocuments({ owner_id: userId });
        const publications = await Publication.find({ owner_id: userId })
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPages = Math.ceil(totalPublications / limit);
        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            totalPublications: totalPublications
        };

        const degreeDisplay = user.degree ? (req.getLocale() === 'vi' ? user.degree.vi : user.degree.en) : '';
        const jobTitleDisplay = user.jobTitles && user.jobTitles.length > 0
            ? user.jobTitles.map(title => req.getLocale() === 'vi' ? title.vi : title.en).join(', ')
            : '';

        res.render('personnel-detail', {
            user,
            publications,
            degreeDisplay,
            jobTitleDisplay,
            pagination,
            sortBy,
            order,
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        console.error('Error fetching personnel details:', error);
        res.status(500).render('500', { locale: req.getLocale(), __: res.__, message: 'Failed to fetch personnel details.' });
    }
};
const getPersonnelPublications = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID.' });
        }

        const user = await User.findOne({
            _id: userId,
            role: { $in: ['personnel', 'colab'] },
            isLocked: false
        }).lean();

        if (!user) {
            return res.status(404).json({ error: 'Personnel not found.' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || null;
        const order = req.query.order || 'desc';

        let sortCriteria = { publicationYear: -1, citationCount: -1 };
        if (sortBy) {
            if (sortBy === 'year') {
                sortCriteria = { publicationYear: order === 'asc' ? 1 : -1 };
            } else if (sortBy === 'citation') {
                sortCriteria = { citationCount: order === 'asc' ? 1 : -1 };
            }
        }

        const totalPublications = await Publication.countDocuments({ owner_id: userId });
        const publications = await Publication.find({ owner_id: userId })
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPages = Math.ceil(totalPublications / limit);
        const pagination = {
            currentPage: page,
            totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            totalPublications: totalPublications
        };

        res.json({
            publications,
            pagination,
            sortBy,
            order
        });
    } catch (error) {
        console.error('Error fetching publications:', error);
        res.status(500).json({ error: 'Failed to fetch publications.' });
    }
};


module.exports = {
    getAllPersonnelUsers,
    getAllInternUsers,
    getUserDetail,
    addUser,
    updateUser,
    deleteUser,
    getUserFieldOptions,
    getPersonnelForPage,
    getPersonnelDetail,
    getPersonnelPublications,
};