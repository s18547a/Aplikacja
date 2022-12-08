import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();
//const UserController=require('../controllers/UserController');
const userController=new UserController();
router.post('/', userController.login);

module.exports=router;