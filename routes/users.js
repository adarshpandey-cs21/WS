const express=require('express');
const router=express.Router();

const usersController=require('../controller/user_controller');
const usersHome=require('../controller/user_home');
 
router.get('/home',usersHome.home);
router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

 
module.exports=router;