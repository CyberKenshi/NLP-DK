const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');
const multer = require('../middlewares/multer'); // Giả định cấu hình multer

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Create a new news article
 *     description: Create a new news article with title, content, categories, and optional thumbnail upload.
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
 *               categoryIds:
 *                 type: string
 *                 example: '["682bdb29f7c406761c467d93", "682bdb29f7c406761c467d94"]'
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Optional thumbnail image file
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
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "682bdb29f7c406761c467d93"
 *                     thumbnail:
 *                       type: string
 *                       example: "/uploads/sample.jpg"
 *                     owner_id:
 *                       type: string
 *                       example: "682bdb29f7c406761c467d93"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-23T07:00:00Z"
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: An error occurred while creating news.
 *   get:
 *     summary: Get list of news articles
 *     description: Retrieve a paginated list of news articles with optional search and sorting.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: search
 *         in: query
 *         description: Search keyword in title or content
 *         required: false
 *         schema:
 *           type: string
 *       - name: orderby
 *         in: query
 *         description: Sort order (newest or oldest)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *           default: newest
 *     responses:
 *       200:
 *         description: List of news articles retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "New AI Research"
 *                       content:
 *                         type: string
 *                         example: "<p>This is a news article about AI.</p>"
 *                       thumbnail:
 *                         type: string
 *                         example: "/uploads/sample.jpg"
 *                       createdAt:
 *                         type: string
 *                         example: "2025-05-23T07:00:00Z"
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: An error occurred while fetching news.
 */

/**
 * @swagger
 * /api/v1/news/{id}:
 *   get:
 *     summary: Get a specific news article by ID
 *     description: Retrieve details of a single news article.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the news article
 *         required: true
 *         schema:
 *           type: string
 *           example: "682bdb29f7c406761c467d93"
 *     responses:
 *       200:
 *         description: News article retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "New AI Research"
 *                     content:
 *                       type: string
 *                       example: "<p>This is a news article about AI.</p>"
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "682bdb29f7c406761c467d93"
 *                     thumbnail:
 *                       type: string
 *                       example: "/uploads/sample.jpg"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-23T07:00:00Z"
 *       404:
 *         description: News article not found.
 *       500:
 *         description: An error occurred while fetching news.
 *   put:
 *     summary: Update a news article
 *     description: Update an existing news article with optional thumbnail.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the news article to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "682bdb29f7c406761c467d93"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated AI Research"
 *               content:
 *                 type: string
 *                 example: "<p>Updated content about AI.</p>"
 *               categoryIds:
 *                 type: string
 *                 example: '["682bdb29f7c406761c467d93", "682bdb29f7c406761c467d94"]'
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Optional new thumbnail image file
 *     responses:
 *       200:
 *         description: News article updated successfully.
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
 *                   example: News updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated AI Research"
 *                     content:
 *                       type: string
 *                       example: "<p>Updated content about AI.</p>"
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: News article not found.
 *       500:
 *         description: An error occurred while updating news.
 *   delete:
 *     summary: Delete a news article
 *     description: Delete an existing news article by ID.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the news article to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "682bdb29f7c406761c467d93"
 *     responses:
 *       200:
 *         description: News article deleted successfully.
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
 *                   example: News deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: News article not found.
 *       500:
 *         description: An error occurred while deleting news.
 */

/**
 * @swagger
 * /api/v1/news/upload-image:
 *   post:
 *     summary: Upload image for CKEditor
 *     description: Upload an image and return the URL for CKEditor.
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
 *               upload:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "/uploads/sample.jpg"
 *       400:
 *         description: Invalid file.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: An error occurred while uploading image.
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Render news list page
 *     description: Render the news list page with pagination, search, and sorting options.
 *     tags:
 *       - News
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: search
 *         in: query
 *         description: Search keyword in title or content
 *         required: false
 *         schema:
 *           type: string
 *       - name: orderby
 *         in: query
 *         description: Sort order (newest or oldest)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *           default: newest
 *     responses:
 *       200:
 *         description: News list page rendered successfully.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Render news detail page
 *     description: Render the detail page for a specific news article.
 *     tags:
 *       - News
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the news article
 *         required: true
 *         schema:
 *           type: string
 *           example: "682bdb29f7c406761c467d93"
 *     responses:
 *       200:
 *         description: News detail page rendered successfully.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: News article not found.
 */
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNews);
router.post('/', multer.single('thumbnail'), newsController.createNews);
router.post('/upload-image', multer.single('upload'), newsController.uploadImage);
router.put('/api/v1/news/:id', multer.single('thumbnail'), newsController.updateNews);
router.delete('/api/v1/news/:id', newsController.deleteNews);
module.exports = router;