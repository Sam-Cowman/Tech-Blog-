// controllers/commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single comment
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
