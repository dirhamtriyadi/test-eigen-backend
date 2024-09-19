const { Op } = require("sequelize");
const { Book, Borrow } = require("../models");

class BooksController {
  static async index(req, res) {
    try {
      // get all books with stock greater than or equal to 1
      const books = await Book.findAll({
        where: {
          stock: {
            [Op.gte]: 1,
          },
        },
      });

      // return response with data
      return res.status(200).json({
        status: "success",
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async store(req, res) {
    try {
      // get code, title, author, and stock from request body and create book
      const { code, title, author, stock } = req.body;
      const book = await Book.create({ code, title, author, stock });

      // return success response
      return res.status(201).json({
        status: "success",
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async show(req, res) {
    try {
      // get id from request params and find book by id
      const { id } = req.params;
      const book = await Book.findByPk(id, {
        include: {
          model: Borrow,
          as: "borrows",
          attributes: ["id", "date", "status"],
        },
      });

      // return response with data
      return res.status(200).json({
        status: "success",
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      // get id from request params
      const { id } = req.params;
      const { code, title, author, stock } = req.body;

      // find book by id and update
      const book = await Book.findByPk(id);
      book.code = code;
      book.title = title;
      book.author = author;
      book.stock = stock;
      await book.save();

      // return success response
      return res.status(200).json({
        status: "success",
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      // get id from request params and delete book
      const { id } = req.params;
      const book = await Book.findByPk(id);
      await book.destroy();

      // return success response
      return res.status(200).json({
        status: "success",
        message: "Book deleted",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = BooksController;
