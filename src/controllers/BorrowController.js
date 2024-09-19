const { Borrow, Member, Book } = require("../models");

class BorrowController {
  static async borrowBook(req, res) {
    try {
      const memberId = req.params.memberId;
      const bookCode = req.body.code;
      const member = await Member.findByPk(memberId, {
        include: {
          model: Borrow,
          as: "borrows",
          attributes: ["id", "date", "status"],
        },
      });
      const book = await Book.findOne({ where: { code: bookCode } });

      // check if member exist
      if (!member) {
        return res.status(404).json({
          status: "error",
          message: "Member not found",
        });
      }

      // check if book exist
      if (!book) {
        return res.status(404).json({
          status: "error",
          message: "Book not found",
        });
      }

      // check if member has borrowed 2 books with status borrowed
      if (
        member.borrows.filter((borrow) => borrow.status === "borrowed")
          .length >= 2
      ) {
        return res.status(400).json({
          status: "error",
          message: "Member has borrowed 2 books",
        });
      }

      // check if book stock is 0
      if (book.stock === 0) {
        return res.status(400).json({
          status: "error",
          message: "Book out of stock",
        });
      }

      // check if member is penalized and banned 3 days
      if (member.penalizedAt) {
        const penalizedAt = new Date(member.penalizedAt);
        const bannedAt = new Date(
          penalizedAt.setDate(penalizedAt.getDate() + 3)
        );
        if (bannedAt > new Date()) {
          return res.status(400).json({
            status: "error",
            message: "Member is banned 3 days",
          });
        }
      }

      // create borrow record
      const borrow = await Borrow.create({
        member_id: memberId,
        book_id: book.id,
        date: new Date(),
        status: "borrowed",
      });
      book.stock -= 1;
      await book.save();

      // return success response
      return res.status(201).json({
        status: "success",
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async returnBook(req, res) {
    try {
      const memberId = req.params.memberId;
      const bookCode = req.body.code;
      const member = await Member.findByPk(memberId, {
        include: {
          model: Borrow,
          as: "borrows",
          attributes: ["id", "date", "status"],
        },
      });
      const book = await Book.findOne({ where: { code: bookCode } });

      // check if member exist
      if (!member) {
        return res.status(404).json({
          status: "error",
          message: "Member not found",
        });
      }

      // check if book exist
      if (!book) {
        return res.status(404).json({
          status: "error",
          message: "Book not found",
        });
      }
      const borrow = await Borrow.findOne({
        where: {
          member_id: memberId,
          book_id: book.id,
          status: "borrowed",
        },
      });

      // check if book is borrowed
      if (!borrow) {
        return res.status(400).json({
          status: "error",
          message: "Book not borrowed",
        });
      }
      const returnDate = new Date();
      const dueDate = new Date(borrow.date);
      const dayLate = Math.floor(
        (returnDate - dueDate) / (24 * 60 * 60 * 1000)
      );

      // check if book is returned late more than 7 days
      if (dayLate > 7) {
        member.penalizedAt = new Date();
        await member.save();
      }
      borrow.status = "returned";
      await borrow.save();
      book.stock += 1;
      await book.save();
      
      // return success response
      return res.status(200).json({
        status: "success",
        message: "Book returned successfully",
        data: borrow,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = BorrowController;
