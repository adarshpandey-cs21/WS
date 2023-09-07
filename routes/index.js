const express=require('express');

 const router=express.Router();

 const homeController=require('../controller/home_controller')
 
 


 router.get('/',homeController.home);
 router.use('/users',require('./users'));

//for any furhur routes
//router.use('/routerName',require('./fileName'))

 console.log("router loaded");
 module.exports= router;