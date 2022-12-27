const express=require('express');

const userController=require('../controlllers/userControllers');

const auth=require("../utils/auth")

const path = require("path");

const router=express.Router();

router.get('/',userController.indexGet)

router.get('/register',userController.register)

router.post('/registerData',userController.registerData)

router.post('/',userController.indexPost);


// router.get('/viewUser',userController.viewUser)

// router.get('/userView',userController.userView)


router.use(auth);




router.get('/admin',userController.useradmin);

router.get('/home',userController.userHome);

router.delete('/deleteUser/:id',userController.deleteUser)

router.get('/admin/:id/edit',userController.adminEdit)

router.put('/editUserPut/:id',userController.adminPutEdit)

router.get('/admin/adminAdd',userController.adminAdd);

router.post('/admin/newData',userController.newData);

router.post('/admin/search',userController.search);

router.get('/logout',userController.logout);


module.exports=router;