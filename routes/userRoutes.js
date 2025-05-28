const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: API endpoints for managing employees and interns
 */

/**
 * @swagger
 * /api/v1/users/personnel:
 *   get:
 *     summary: Get all personnel users
 *     description: Retrieve a list of all users with the role 'personnel'.
 *     tags: [Employees]
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
 *                   example: 2
 *                 data:
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
 *       500:
 *         description: An error occurred while retrieving personnel users.
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
 *                   example: Failed to fetch personnel users.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */
router.get('/personnel', userController.getAllPersonnelUsers);

/**
 * @swagger
 * /api/v1/users/intern:
 *   get:
 *     summary: Get all intern users
 *     description: Retrieve a list of all users with the role 'intern' without pagination.
 *     tags: [Employees]
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
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: 12346
 *                       fullName:
 *                         type: string
 *                         example: Nguyễn Văn A
 *                       email:
 *                         type: string
 *                         example: nva@tdtu.edu.vn
 *                       role:
 *                         type: string
 *                         example: intern
 *                       createdAt:
 *                         type: string
 *                         example: 20/05/2025 09:00:00
 *                       updatedAt:
 *                         type: string
 *                         example: 20/05/2025 09:00:00
 *       500:
 *         description: An error occurred while retrieving intern users.
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
 *                   example: Failed to fetch intern users.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */
router.get('/intern', userController.getAllInternUsers);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get user details by userId
 *     description: Retrieve detailed information of a specific user by their userId.
 *     tags: [Employees]
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
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
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
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: An error occurred while retrieving user details.
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
 *                   example: Failed to fetch user details.
 *                 error:
 *                   type: string
 *                   example: <error details>
 *   put:
 *     summary: Update user details by userId
 *     description: Update the details of a specific user by their userId.
 *     tags: [Employees]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 12345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Lê Anh Cường Updated
 *               email:
 *                 type: string
 *                 example: leanhcuong.updated@tdtu.edu.vn
 *               role:
 *                 type: string
 *                 enum: [personnel, intern]
 *                 example: personnel
 *               jobTitles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     vi:
 *                       type: string
 *                       example: Trưởng Khoa
 *                     en:
 *                       type: string
 *                       example: Dean
 *               degree:
 *                 type: object
 *                 properties:
 *                   vi:
 *                     type: string
 *                     example: Giáo sư
 *                   en:
 *                     type: string
 *                     example: Prof.
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 12345
 *                     fullName:
 *                       type: string
 *                       example: Lê Anh Cường Updated
 *                     email:
 *                       type: string
 *                       example: leanhcuong.updated@tdtu.edu.vn
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
 *                             example: Trưởng Khoa
 *                           en:
 *                             type: string
 *                             example: Dean
 *                     degree:
 *                       type: object
 *                       properties:
 *                         vi:
 *                           type: string
 *                           example: Giáo sư
 *                         en:
 *                           type: string
 *                           example: Prof.
 *                     createdAt:
 *                       type: string
 *                       example: 20/05/2025 09:00:00
 *                     updatedAt:
 *                       type: string
 *                       example: 24/05/2025 14:00:00
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
 *       500:
 *         description: An error occurred while updating user details.
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
 *                   example: Failed to update user.
 *                 error:
 *                   type: string
 *                   example: <error details>
 *   delete:
 *     summary: Delete a user by userId
 *     description: Delete a specific user by their userId.
 *     tags: [Employees]
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
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User deleted successfully.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
 *       500:
 *         description: An error occurred while deleting user.
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
 *                   example: Failed to delete user.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */
router.get('/:userId', userController.getUserDetail);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user with the provided details.
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, role]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn B
 *               email:
 *                 type: string
 *                 example: nvb@tdtu.edu.vn
 *               role:
 *                 type: string
 *                 enum: [personnel, intern]
 *                 example: intern
 *               jobTitles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     vi:
 *                       type: string
 *                       example: Thực tập sinh
 *                     en:
 *                       type: string
 *                       example: Intern
 *               degree:
 *                 type: object
 *                 properties:
 *                   vi:
 *                     type: string
 *                     example: Cử nhân
 *                   en:
 *                     type: string
 *                     example: Bachelor
 *     responses:
 *       201:
 *         description: Success
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
 *                     userId:
 *                       type: string
 *                       example: 12347
 *                     fullName:
 *                       type: string
 *                       example: Nguyễn Văn B
 *                     email:
 *                       type: string
 *                       example: nvb@tdtu.edu.vn
 *                     role:
 *                       type: string
 *                       example: intern
 *                     jobTitles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           vi:
 *                             type: string
 *                             example: Thực tập sinh
 *                           en:
 *                             type: string
 *                             example: Intern
 *                     degree:
 *                       type: object
 *                       properties:
 *                         vi:
 *                           type: string
 *                           example: Cử nhân
 *                         en:
 *                           type: string
 *                           example: Bachelor
 *                     createdAt:
 *                       type: string
 *                       example: 24/05/2025 14:00:00
 *                     updatedAt:
 *                       type: string
 *                       example: 24/05/2025 14:00:00
 *       500:
 *         description: An error occurred while creating the user.
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
 *                   example: Failed to add user.
 *                 error:
 *                   type: string
 *                   example: <error details>
 */
router.post('/', userController.addUser);
/**
 * @swagger
 * /api/v1/users/field-options:
 *   get:
 *     summary: Get user field options
 *     description: Retrieve options for user fields like roles and degrees.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
router.get('/field-options', userController.getUserFieldOptions);

module.exports = router;