import express, { Response } from "express";
const router = express.Router();
const UserController=require("../controllers/UserController");

router.post("/", UserController.login);

module.exports=router