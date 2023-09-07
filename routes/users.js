const express=require('express');
const router=express.Router();

const usersController=require('../controller/user_controller');
const usersHome=require('../controller/user_home');
 
router.get('/home',usersHome.home);
router.get('/profile',usersController.profile);

 
module.exports=router;