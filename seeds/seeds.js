const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'testuser1',
    password: 'password123',
  },
  {
    username: 'testuser2',
    password: 'password123',
  },
  {
    username: 'testuser3',
    password: 'password123',
  },
];

const postData = [
  {
    title: 'First Post',
    content: 'This is the content of the first post.',
    user_id: 1,
  },
  {
    title: 'Second Post',
    content: 'This is the content of the second post.',
    user_id: 2,
  },
  {
    title: 'Third Post',
    content: 'This is the content of the third post.',
    user_id: 3,
  },
];

const commentData = [
  {
    comment_text: 'This is a comment on the first post.',
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: 'This is another comment on the first post.',
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: 'This is a comment on the second post.',
    user_id: 1,
    post_id: 2,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();