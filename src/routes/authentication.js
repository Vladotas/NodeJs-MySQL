const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn,isNotLoggedin } = require('../lib/auth');

// SIGNUP
router.get('/signup',isNotLoggedin, (req, res) => {
    res.render('auth/signup');
  });
  
router.post('/signup',isNotLoggedin, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // SINGIN
router.get('/signin',isNotLoggedin, (req, res) => {
    res.render('auth/signin');
  });
  
  router.post('/signin',isNotLoggedin, (req, res, next) => {
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  });
  
  router.get('/logout',isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
  });
  
  router.get('/profile',isLoggedIn, (req, res) => {
    res.render('profile');
  });
  

module.exports = router;