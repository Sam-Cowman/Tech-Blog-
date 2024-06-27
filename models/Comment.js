const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

Comment.init(
  {
    // Define the ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the comment text column
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Reference to the user who created the comment
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Reference to the post the comment belongs to
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;