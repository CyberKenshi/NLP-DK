const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');
const multer = require('../middlewares/multer');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNews);
router.post('/', multer.single('thumbnail'), newsController.createNews);
router.post('/upload-image', multer.single('upload'), newsController.uploadImage);
router.get('/api/v1/news/', newsController.getNewsList);
router.put('/api/v1/news/:id', multer.single('thumbnail'), newsController.updateNews);
router.delete('/api/v1/news/:id', newsController.deleteNews);
module.exports = router;