const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Route để lấy tất cả user có role 'personnel'
router.get('/personnel', userController.getAllPersonnelUsers);

/**
 * @swagger
 * /api/v1/users/personnel:
 *   get:
 *     summary: Get all personnel users
 *     description: Retrieve a list of all users with the role 'personnel'.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: null
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: 12345
 *                       fullName:
 *                         type: string
 *                         example: Lê Anh Cường
 *                       email:
 *                         type: string
 *                         example: leanhcuong@tdtu.edu.vn
 *                       role:
 *                         type: string
 *                         example: personnel
 *                       jobTitles:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             vi:
 *                               type: string
 *                               example: Phó Trưởng Khoa
 *                             en:
 *                               type: string
 *                               example: Vice Dean
 *                       degree:
 *                         type: object
 *                         properties:
 *                           vi:
 *                             type: string
 *                             example: Phó Giáo sư
 *                           en:
 *                             type: string
 *                             example: Assoc. Prof.
 *                       createdAt:
 *                         type: string
 *                         example: 20/05/2025 09:00:00
 *                       updatedAt:
 *                         type: string
 *                         example: 20/05/2025 09:00:00
 *       404:
 *         description: No personnel users found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: No personnel users found.
 *                 result:
 *                   type: null
 *       500:
 *         description: An error occurred while retrieving personnel users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Failed to fetch personnel users.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */

// Route để lấy thông tin chi tiết của một user
router.get('/:userId', userController.getUserDetail);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get user details by userId
 *     description: Retrieve detailed information of a specific user by their userId.
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 12345
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: null
 *                 result:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 12345
 *                     fullName:
 *                       type: string
 *                       example: Lê Anh Cường
 *                     email:
 *                       type: string
 *                       example: leanhcuong@tdtu.edu.vn
 *                     role:
 *                       type: string
 *                       example: personnel
 *                     jobTitles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           vi:
 *                             type: string
 *                             example: Phó Trưởng Khoa
 *                           en:
 *                             type: string
 *                             example: Vice Dean
 *                     degree:
 *                       type: object
 *                       properties:
 *                         vi:
 *                           type: string
 *                           example: Phó Giáo sư
 *                         en:
 *                           type: string
 *                           example: Assoc. Prof.
 *                     createdAt:
 *                       type: string
 *                       example: 20/05/2025 09:00:00
 *                     updatedAt:
 *                       type: string
 *                       example: 20/05/2025 09:00:00
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found.
 *                 result:
 *                   type: null
 *       500:
 *         description: An error occurred while retrieving user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Failed to fetch user details.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */

module.exports = router;