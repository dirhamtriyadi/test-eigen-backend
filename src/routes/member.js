const router = require('express').Router();
const MemberController = require('../controllers/MemberController');

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member management
 */

/**
 * @swagger
 * /member:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/', MemberController.index);

/**
 * @swagger
 * /member:
 *   post:
 *     summary: Create a new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: The member was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 */
router.post('/', MemberController.store);

/**
 * @swagger
 * /member/{id}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     responses:
 *       200:
 *         description: The member description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: The member was not found.
 */
router.get('/:id', MemberController.show);

/**
 * @swagger
 * /member/{id}:
 *   put:
 *     summary: Update a member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: The member was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: The member was not found.
 */
router.put('/:id', MemberController.update);

/**
 * @swagger
 * /member/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     responses:
 *       204:
 *         description: The member was successfully deleted.
 *       404:
 *         description: The member was not found.
 */
router.delete('/:id', MemberController.destroy);

module.exports = router;