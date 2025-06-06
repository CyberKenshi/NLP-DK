const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/multerAvatar');
const upload = require('../middlewares/multer'); 
const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController'); 
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const { adminProtect } = require('../middlewares/authMiddleware');


router.get('/login', (req, res) => {
    res.render('admin/adminLogin', {
        locale: req.getLocale(),
        __: res.__
    });
});



// ==== Route: Xử lý login (POST) ====

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }
        const user = await User.findOne({

            $or: [{ email: identifier }, { username: identifier }]
        });
        if (!user) {
            return res.status(401).json({ message: 'Sai username hoặc mật khẩu' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Sai username hoặc mật khẩu' });
        }

        res.cookie('adminLoggedIn', 'true', {

            httpOnly: true,

            sameSite: 'strict',

            maxAge: 24 * 60 * 60 * 1000

        });
        return res.status(200).json({ message: 'Đăng nhập thành công' });
    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return res.status(500).json({ message: 'Lỗi hệ thống khi đăng nhập' });
    }
});

// ==== Route: Logout ====
router.get('/logout', (req, res) => {
    res.clearCookie('adminLoggedIn', { path: '/admin/' });
    res.clearCookie('adminSession', { path: '/admin/' });
    res.redirect('/admin/login');
});



// Admin Dashboard
router.get('/' ,adminProtect,(req, res) => {
    res.render('admin/admin', {
        locale: req.getLocale(),
        __: res.__
    });
});

// Add Personnel Page
router.get('/addPersonnel', adminProtect,(req, res) => {
    res.render('admin/addPersonnel', {
        locale: req.getLocale(),
        __: res.__
    });
});

// Add Intern Page
router.get('/addIntern',adminProtect, (req, res) => {
    res.render('admin/addIntern', {
        locale: req.getLocale(),
        __: res.__
    });
});

// Add News Page
router.get('/news-form',adminProtect, (req, res) => {
    res.render('admin/newsForm', {
        locale: req.getLocale(),
        successMessage: null,
        errorMessage: null,
        __: res.__
    });
});


router.get('/edit-personnel/:id', adminProtect,async (req, res) => {
    try {
        const user = await userController.getUserDetailByIdAdmin(req.params.id);
        if (!user) {
            return res.status(404).render('error', { message: 'Personnel not found' });
        }
        res.render('admin/editPersonnel', {
            user: user.data,
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message || 'Error fetching personnel data' });
    }
});

// Edit Intern Page
router.get('/edit-intern/:id', adminProtect,async (req, res) => {
    try {
        const intern = await userController.getUserDetailByIdAdmin(req.params.id, 'intern');
        if (!intern) {
            return res.status(404).render('error', { message: 'Intern not found' });
        }
        res.render('admin/editIntern', {
            intern: intern.data,
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message || 'Error fetching personnel data' });
    }
});

// Edit News Page
router.get('/edit-news/:id', adminProtect,async (req, res) => {
    try {
        const news = await newsController.getNewsById(req.params.id);
        if (!news) {
            return res.status(404).render('error', { message: 'News not found' });
        }
        res.render('admin/editNews', {
            news: news,
            locale: req.getLocale(),
            __: res.__
        });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching news data' });
    }
});

// Add User (Personnel or Intern)
router.post('/user/add', adminProtect, uploadAvatar.single('avatarFile'), userController.addUser);

// Update Personnel
router.post('/user/update-personnel/:id', adminProtect,uploadAvatar.single('avatarFile'), userController.updateUser);

// Update Intern
router.post('/user/update-intern/:id', adminProtect,uploadAvatar.single('avatarFile'), userController.updateUser);

router.post('/user/delete/:id', adminProtect,userController.deleteUser);

// Update News
router.post('/news/update/:id', adminProtect, upload.single('thumbnail'), newsController.updateNews);

router.post('/news/delete/:id', adminProtect,newsController.deleteNews);

module.exports = router;