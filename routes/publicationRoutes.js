const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController.js');

/**
 * @swagger
 * /api/v1/publications/user/{userId}:
 *   get:
 *     summary: Get publications by userId with pagination
 *     description: Retrieve a list of publications for a specific user with pagination support.
 *     tags:
 *       - Publications
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 682bdb29f7c406761c467d93
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 total:
 *                   type: integer
 *                   example: 15
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "A Study on NLP Techniques"
 *                       publicationDate:
 *                         type: string
 *                         example: "2023-01-15T00:00:00Z"
 *                       citationCount:
 *                         type: integer
 *                         example: 50
 *                       authors:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Lê Anh Cường"
 *       404:
 *         description: No publications found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No publications found for the user.
 *                 error:
 *                   type: null
 *       500:
 *         description: An error occurred while retrieving publications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to fetch publications.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */

router.get('/user/:userId', publicationController.getPublicationsByUserId);

module.exports = router;