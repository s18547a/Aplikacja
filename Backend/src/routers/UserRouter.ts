import express from 'express';
import UserController from '../controllers/UserController';
import UserRepository from '../models/repositories/UserRepository';
const router = express.Router();
//const UserController=require('../controllers/UserController');
const userRepository=new UserRepository();
const userController=new UserController(userRepository);
router.post('/', userController.login);

module.exports=router;