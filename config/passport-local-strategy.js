const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async function (req, email, password, done) {
      try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          req.flash('error', 'Invalid username/password!!');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash('error', err.message);
        return done(err);
      }
    }
  )
);

// Serialize the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize the user from the key in the cookie
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

// Check if the user is authenticated or not
passport.checkAuthentication = async function (req, res, next) {
  // If the user is signed in, then pass on the request to the next function(controller action)
  if (req.isAuthenticated()) {
    return next();
  }

  // If the user is not signed in
  return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
