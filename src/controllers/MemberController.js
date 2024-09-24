const { Member } = require("../models");

class MemberController {
  static async index(req, res) {
    try {
      // get all member with count borrowed book that has status borrowed
      const members = await Member.findAll({
        attributes: {
          include: [
            [
              Member.sequelize.literal(
                `(SELECT COUNT(*) FROM Borrow WHERE Borrow.member_id = Member.id AND Borrow.status = 'borrowed')`
              ),
              "borrowed_books",
            ],
          ],
        },
      });

      // return response with data
      return res.status(200).json({
        status: "success",
        message: "Members retrieved successfully",
        data: members,
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
      // get code and name from request body and create member
      const { code, name } = req.body;
      const member = await Member.create({ code, name });

      // return success response
      return res.status(201).json({
        status: "success",
        message: "Member created successfully",
        data: member,
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
      // get id from request params and find member by id
      const { id } = req.params;
      const member = await Member.findByPk(id);

      // return response with data
      return res.status(200).json({
        status: "success",
        message: "Member retrieved successfully",
        data: member,
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
      const { code, name } = req.body;

      // find member by id and update
      const member = await Member.findByPk(id);
      member.code = code;
      member.name = name;
      await member.save();

      // return response with data
      return res.status(200).json({
        status: "success",
        message: "Member updated successfully",
        data: member,
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
      // get id from request params and delete member
      const { id } = req.params;
      const member = await Member.findByPk(id);
      await member.destroy();

      // return success response
      return res.status(200).json({
        status: "success",
        message: "Member deleted successfully",
        data: member,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = MemberController;
