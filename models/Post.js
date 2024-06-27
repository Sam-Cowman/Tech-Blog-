const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model
class Post extends Model {}

Post.init(
  {
    // Define the ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Reference to the user who created the post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;