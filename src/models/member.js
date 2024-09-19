'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penalizedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Member',
  });
  Member.associate = function(models) {
    Member.hasMany(models.Borrow, {
      foreignKey: 'member_id',
      as: 'borrows'
    });
  }
  return Member;
};