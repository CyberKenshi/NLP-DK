const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/multerAvatar');
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('admin/admin', {
        locale: req.getLocale(),
        __: res.__
    });
});

router.get('/addPersonnel', (req, res) => {
    res.render('admin/addPersonnel', {
        locale: req.getLocale(),
        __: res.__
    });
});
router.get('/addIntern', (req, res) => {
    res.render('admin/addIntern', {
        locale: req.getLocale(),
        __: res.__
    });
});

router.get('/edit-user', (req, res) => {
    res.render('admin/edit-user', {
        locale: req.getLocale(),
        __: res.__
    });
});

router.post('/user/add', uploadAvatar.single('avatarFile'), userController.addUser);

module.exports = router;