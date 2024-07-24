const withAuth = (req, res, next) => {
  console.log('Checking authentication:', req.session); // Add this line to check session data
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
