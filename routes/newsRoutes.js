const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');
// const { protect } = require('../middlewares/authMiddleware');
const multer = require('../middlewares/multer'); 

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Create a new news article
 *     description: Create a new news article with title, content, and optional image upload.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New AI Research"
 *               content:
 *                 type: string
 *                 example: "<p>This is a news article about AI.</p>"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file
 *     responses:
 *       201:
 *         description: News created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: News created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "New AI Research"
 *                     content:
 *                       type: string
 *                       example: "<p>This is a news article about AI.</p>"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://res.cloudinary.com/dx5333xez/image/upload/news/sample.jpg"
 *                     owner_id:
 *                       type: string
 *                       example: "682bdb29f7c406761c467d93"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-21T07:00:00Z"
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: An error occurred while creating news.
 */

router.post('/', multer.single('image'), newsController.createNews);

module.exports = router;