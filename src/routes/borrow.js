const router = require('express').Router();

const BorrowController = require('../controllers/BorrowController');

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: Borrow management
 */

/**
 * @swagger
 * /borrow/{memberId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The code of the book to borrow
 *     responses:
 *       201:
 *         description: The book was successfully borrowed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Member or book not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/:memberId', BorrowController.borrowBook);

/**
 * @swagger
 * /borrow/return/{memberId}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The code of the book to return
 *     responses:
 *       200:
 *         description: The book was successfully returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Member or book not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/return/:memberId', BorrowController.returnBook);

module.exports = router;