const router = require('express').Router();
const {Post, User, Comment} = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=>{
    try {
        // query the database for all posts to deliver to the view 
        const postData = await Post.findAll({
            include:[
                {
                    model: User, attributes: ['username']
                }
            ]
        })
    
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)
        // render the view 
        res.render('home', {
            // add objects to be passed to view here
            posts, loggedin: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });
  
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            include: [User],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
