const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controller/user_controller');
const usersHome=require('../controller/user_home');
 
router.get('/home',usersHome.home);
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.get('/sign-out',usersController.destroySession);

router.post('/create',usersController.create);

//use passport as milddleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

),usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);


module.exports=router;