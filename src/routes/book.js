const router = require("express").Router();

const BookController = require("../controllers/BookController");

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Book management
 */

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", BookController.index);

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post("/", BookController.store);

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found.
 */
router.get("/:id", BookController.show);

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found.
 */
router.put("/:id", BookController.update);

/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: The book was successfully deleted.
 *       404:
 *         description: The book was not found.
 */
router.delete("/:id", BookController.destroy);

module.exports = router;
